"use server";

export async function getDataQualityMetrics() {
  const results = [
    { id: '1', testName: 'offer_date_before_hire_date', status: 'PASS', affectedRows: 0, severity: 'HIGH' },
    { id: '2', testName: 'candidate_without_source', status: 'FAIL', affectedRows: 38, severity: 'HIGH' },
    { id: '3', testName: 'missing_hiring_manager', status: 'PASS', affectedRows: 0, severity: 'HIGH' },
    { id: '4', testName: 'stale_candidates_in_review', status: 'FAIL', affectedRows: 124, severity: 'MEDIUM' },
    { id: '5', testName: 'invalid_stage_transitions', status: 'PASS', affectedRows: 0, severity: 'MEDIUM' },
    { id: '6', testName: 'duplicate_candidate_emails', status: 'FAIL', affectedRows: 12, severity: 'LOW' },
    { id: '7', testName: 'closed_reqs_active_candidates', status: 'PASS', affectedRows: 0, severity: 'LOW' },
  ];

  const totalTests = results.length;
  const passedTests = results.filter(r => r.status === 'PASS').length;
  const failedTests = totalTests - passedTests;
  
  const score = totalTests > 0 ? (passedTests / totalTests) * 100 : 0;
  
  const totalAffectedRows = results.reduce((sum, r) => sum + r.affectedRows, 0);

  return {
    results,
    score: score.toFixed(1),
    passedTests,
    failedTests,
    totalAffectedRows
  };
}
