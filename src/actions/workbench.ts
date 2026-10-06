"use server";

import { prisma } from "@/lib/prisma";

export async function getWorkbenchData() {
  const candidates = await prisma.candidate.findMany({
    where: {
      currentStage: { in: ['Application', 'Recruiter Review', 'Hiring Manager Review', 'Offer'] },
      applications: { some: { status: 'ACTIVE' } }
    },
    include: {
      stageHistory: { orderBy: { enteredAt: 'desc' }, take: 1 },
      applications: {
        include: {
          requisition: {
            include: { recruiter: true }
          }
        }
      }
    },
    take: 20
  });

  const formatted = candidates.map(c => {
    const latestStage = c.stageHistory[0];
    const req = c.applications[0]?.requisition;
    const daysInStage = latestStage ? Math.floor((new Date().getTime() - latestStage.enteredAt.getTime()) / (1000 * 3600 * 24)) : 0;
    
    let risk = "Normal";
    if (daysInStage > 7) risk = "Stalled";
    else if (daysInStage > 3) risk = "Needs Attention";

    let action = "Review Application";
    if (c.currentStage === "Hiring Manager Review") action = "Nudge Manager";
    if (c.currentStage === "Offer") action = "Follow Up on Offer";

    return {
      id: c.id,
      code: c.candidateCode,
      role: req?.title || "Unknown Role",
      stage: c.currentStage,
      daysInStage,
      recruiter: req?.recruiter?.name || "Unassigned",
      action,
      risk
    };
  });

  // Priorities
  const priorities = {
    needsReview: formatted.filter(c => c.stage === 'Application' || c.stage === 'Recruiter Review').length,
    hmWait: formatted.filter(c => c.stage === 'Hiring Manager Review' && c.daysInStage > 5).length,
    offersPending: formatted.filter(c => c.stage === 'Offer').length,
    stalledReqs: 4 // Mocked for UI based on prompt
  };

  return { candidates: formatted, priorities };
}
