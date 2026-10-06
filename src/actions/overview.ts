"use server";

export async function getOverviewKPIs() {
  // Hardcoded dynamic mock data for Vercel deployment without DB
  return {
    activeReqs: 142,
    totalCandidates: 15481,
    totalHires: 412,
    medianTimeToFill: 38, 
    offerAcceptanceRate: 78,
    interviewToOfferRate: 24,
  };
}

export async function getFunnelData() {
  return [
    { stage: "Application", count: 15481, conversion: 100 },
    { stage: "Recruiter Review", count: 9245, conversion: 60 },
    { stage: "Recruiter Screen", count: 4812, conversion: 52 },
    { stage: "Hiring Manager Review", count: 2104, conversion: 44 },
    { stage: "Interview", count: 1102, conversion: 52 },
    { stage: "Final Interview", count: 680, conversion: 62 },
    { stage: "Offer", count: 528, conversion: 78 },
    { stage: "Hire", count: 412, conversion: 78 },
  ];
}

export async function getHiringHealth() {
  return { 
    onTrack: 98, 
    atRisk: 32, 
    critical: 12 
  };
}
