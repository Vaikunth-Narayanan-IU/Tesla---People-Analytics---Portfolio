"use server";

import { prisma } from "@/lib/prisma";

export async function getDataQualityMetrics() {
  const results = await prisma.dataQualityResult.findMany({
    orderBy: { severity: 'asc' }, // usually you might want to order by status or something
  });

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
