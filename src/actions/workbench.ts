"use server";

export async function getWorkbenchData() {
  const formatted = [
    { id: '1', code: 'CAND-18294', role: 'Software Engineer - Autonomy', stage: 'Hiring Manager Review', daysInStage: 14, recruiter: 'Maya Patel', action: 'Nudge Manager', risk: 'Stalled' },
    { id: '2', code: 'CAND-19012', role: 'Data Analyst, People Products', stage: 'Offer', daysInStage: 4, recruiter: 'Alex Chen', action: 'Follow Up on Offer', risk: 'Needs Attention' },
    { id: '3', code: 'CAND-19543', role: 'Manufacturing Engineer', stage: 'Recruiter Review', daysInStage: 2, recruiter: 'Jordan Smith', action: 'Review Application', risk: 'Normal' },
    { id: '4', code: 'CAND-18772', role: 'Supply Chain Analyst', stage: 'Hiring Manager Review', daysInStage: 8, recruiter: 'Maya Patel', action: 'Nudge Manager', risk: 'Stalled' },
    { id: '5', code: 'CAND-19901', role: 'Product Manager', stage: 'Application', daysInStage: 5, recruiter: 'Alex Chen', action: 'Review Application', risk: 'Needs Attention' },
    { id: '6', code: 'CAND-18334', role: 'Energy Operations Analyst', stage: 'Offer', daysInStage: 6, recruiter: 'Jordan Smith', action: 'Follow Up on Offer', risk: 'Stalled' },
    { id: '7', code: 'CAND-19111', role: 'Software Engineer - Autonomy', stage: 'Recruiter Review', daysInStage: 1, recruiter: 'Maya Patel', action: 'Review Application', risk: 'Normal' },
  ];

  const priorities = {
    needsReview: 12,
    hmWait: 7,
    offersPending: 3,
    stalledReqs: 4
  };

  return { candidates: formatted, priorities };
}
