"use server";

export async function executeSql(query: string) {
  try {
    const q = query.trim().toUpperCase();
    if (!q.startsWith("SELECT")) {
      return { error: "Only SELECT queries are permitted in the SQL Lab." };
    }

    // Mock data responses based on predefined queries
    if (q.includes("SOURCE") && q.includes("CANDIDATE")) {
      return { data: [
        { sourceName: 'Indeed', candidate_count: 4210 },
        { sourceName: 'LinkedIn', candidate_count: 3840 },
        { sourceName: 'Tesla Careers', candidate_count: 2950 },
        { sourceName: 'University Recruiting', candidate_count: 1420 },
        { sourceName: 'Employee Referral', candidate_count: 980 },
        { sourceName: 'Agency', candidate_count: 410 },
      ]};
    }

    if (q.includes("DEPARTMENT") && q.includes("REQUISITION")) {
      return { data: [
        { name: 'Engineering', open_reqs: 48 },
        { name: 'Manufacturing', open_reqs: 32 },
        { name: 'Supply Chain', open_reqs: 18 },
        { name: 'Energy', open_reqs: 15 },
        { name: 'People', open_reqs: 8 },
        { name: 'Finance', open_reqs: 5 },
      ]};
    }

    if (q.includes("HIRING MANAGER REVIEW")) {
      return { data: [
        { stuck_candidates: 342 }
      ]};
    }

    // Generic response for custom queries to look cool
    return { data: [
      { id: '1', result: 'Mock Row 1', created_at: '2023-10-01' },
      { id: '2', result: 'Mock Row 2', created_at: '2023-10-02' },
      { id: '3', result: 'Mock Row 3', created_at: '2023-10-03' },
    ]};
    
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "An error occurred executing the query.";
    return { error: msg };
  }
}
