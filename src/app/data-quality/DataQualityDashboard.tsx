"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, ShieldAlert, Activity, AlertCircle, CheckCircle2 } from "lucide-react";
import { clsx } from "clsx";

export default function DataQualityDashboard({ data }: any) {
  const isHealthy = parseFloat(data.score) >= 90;

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Data Quality Assurance</h1>
        <p className="text-muted">Automated integrity checks on recruiting data.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className={clsx("relative overflow-hidden", isHealthy ? "border-green-500/50" : "border-teslaRed/50")}>
          <div className={clsx("absolute top-0 left-0 w-1 h-full", isHealthy ? "bg-green-500" : "bg-teslaRed")} />
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted font-medium">Data Quality Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={clsx("text-4xl font-bold tracking-tighter", isHealthy ? "text-green-500" : "text-teslaRed")}>
              {data.score}%
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted font-medium">Tests Passed</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-green-500" />
            <div className="text-3xl font-bold">{data.passedTests}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted font-medium">Tests Failed</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-teslaRed" />
            <div className="text-3xl font-bold">{data.failedTests}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted font-medium">Records Affected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-500">{data.totalAffectedRows.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Validation Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted uppercase bg-panel/50 border-b border-panelBorder">
                <tr>
                  <th className="px-6 py-4 font-medium">Test Name</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Affected Rows</th>
                  <th className="px-6 py-4 font-medium">Severity</th>
                  <th className="px-6 py-4 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.results.map((result: any, i: number) => (
                  <motion.tr 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={result.id} 
                    className="border-b border-panelBorder hover:bg-panel/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-mono text-xs">{result.testName}</td>
                    <td className="px-6 py-4">
                      {result.status === 'PASS' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/20">
                          <CheckCircle2 className="h-3 w-3" /> PASS
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-teslaRed/10 text-teslaRed border border-teslaRed/20">
                          <AlertCircle className="h-3 w-3" /> FAIL
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 font-mono text-muted">{result.affectedRows}</td>
                    <td className="px-6 py-4">
                      <span className={clsx(
                        "text-xs font-bold tracking-wider",
                        result.severity === 'HIGH' ? "text-teslaRed" : result.severity === 'MEDIUM' ? "text-yellow-500" : "text-blue-400"
                      )}>
                        {result.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        disabled={result.status === 'PASS'}
                        className="text-xs font-medium text-muted hover:text-white disabled:opacity-30 disabled:hover:text-muted transition-colors"
                      >
                        View Records
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
