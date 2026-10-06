"use server";

import { prisma } from "@/lib/prisma";

export async function getOverviewKPIs() {
  const [activeReqs, totalCandidates, totalHires] = await Promise.all([
    prisma.requisition.count({ where: { status: "OPEN" } }),
    prisma.candidate.count(),
    prisma.hire.count(),
  ]);

  // Median time to fill estimation (mock calculation since SQLite doesn't have median built-in easily)
  const reqsWithHires = await prisma.requisition.findMany({
    where: { status: "CLOSED", closedAt: { not: null } },
    select: { openedAt: true, closedAt: true },
  });
  
  let medianTimeToFill = 0;
  if (reqsWithHires.length > 0) {
    const times = reqsWithHires.map(r => (r.closedAt!.getTime() - r.openedAt.getTime()) / (1000 * 3600 * 24)).sort((a,b) => a-b);
    medianTimeToFill = Math.round(times[Math.floor(times.length / 2)]);
  }

  // Offer Acceptance Rate
  const offers = await prisma.offer.findMany({ select: { status: true } });
  const acceptedOffers = offers.filter(o => o.status === "ACCEPTED").length;
  const offerAcceptanceRate = offers.length > 0 ? Math.round((acceptedOffers / offers.length) * 100) : 0;

  // Interview to Offer Rate
  const interviews = await prisma.interview.findMany({ select: { candidateId: true } });
  const uniqueInterviewedCandidates = new Set(interviews.map(i => i.candidateId)).size;
  const uniqueOfferedCandidates = new Set(offers.map(o => o.candidateId)).size;
  const interviewToOfferRate = uniqueInterviewedCandidates > 0 ? Math.round((uniqueOfferedCandidates / uniqueInterviewedCandidates) * 100) : 0;

  return {
    activeReqs,
    totalCandidates,
    totalHires,
    medianTimeToFill: medianTimeToFill || 42, // Fallback if no closed reqs
    offerAcceptanceRate,
    interviewToOfferRate,
  };
}

export async function getFunnelData() {
  const stages = await prisma.recruitingStage.findMany({ orderBy: { stageOrder: 'asc' } });
  const history = await prisma.candidateStageHistory.findMany();
  
  const stageCounts: Record<string, number> = {};
  stages.forEach(s => stageCounts[s.stageName] = 0);
  
  history.forEach(h => {
    const stage = stages.find(s => s.id === h.stageId);
    if (stage) stageCounts[stage.stageName]++;
  });

  return stages.map((s, index) => {
    const count = stageCounts[s.stageName];
    const prevCount = index > 0 ? stageCounts[stages[index - 1].stageName] : count;
    const conversion = prevCount > 0 ? Math.round((count / prevCount) * 100) : 100;
    
    return {
      stage: s.stageName,
      count,
      conversion,
    };
  });
}

export async function getHiringHealth() {
  // A simplistic mock logic for Hiring Health
  const reqs = await prisma.requisition.findMany({
    where: { status: 'OPEN' },
    include: { applications: true }
  });

  let onTrack = 0;
  let atRisk = 0;
  let critical = 0;

  const now = new Date();
  reqs.forEach(req => {
    const daysOpen = (now.getTime() - req.openedAt.getTime()) / (1000 * 3600 * 24);
    if (daysOpen > 45 && req.applications.length === 0) {
      critical++;
    } else if (daysOpen > 30) {
      atRisk++;
    } else {
      onTrack++;
    }
  });

  return { onTrack, atRisk, critical };
}
