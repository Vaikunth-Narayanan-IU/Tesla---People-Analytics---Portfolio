"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { executeSql } from "@/actions/sql";
import { Terminal, Play, Database, AlertCircle, FileText } from "lucide-react";
import { clsx } from "clsx";

const PREDEFINED_QUESTIONS = [
  {
    title: "Which sourcing channel produces the most candidates?",
    sql: `SELECT s.sourceName, COUNT(c.id) as candidate_count
FROM Candidate c
JOIN Source s ON c.sourceId = s.id
GROUP BY s.sourceName
ORDER BY candidate_count DESC;`,
    interpretation: "Indeed provides the most candidates, but comparing this to hires will reveal actual conversion quality."
  },
  {
    title: "Which departments have the most active requisitions?",
    sql: `SELECT d.name, COUNT(r.id) as open_reqs
FROM Requisition r
JOIN Department d ON r.departmentId = d.id
WHERE r.status = 'OPEN'
GROUP BY d.name
ORDER BY open_reqs DESC;`,
    interpretation: "Engineering typically holds the majority of open headcount, requiring focused sourcing bandwidth."
  },
  {
    title: "How many candidates are stuck in Hiring Manager Review?",
    sql: `SELECT COUNT(*) as stuck_candidates
FROM Candidate c
WHERE c.currentStage = 'Hiring Manager Review';`,
    interpretation: "A high number here indicates that Hiring Managers are a bottleneck and may need prompting."
  }
];

export default function SqlLabPage() {
  const [activeQuestion, setActiveQuestion] = useState(PREDEFINED_QUESTIONS[0]);
  const [query, setQuery] = useState(PREDEFINED_QUESTIONS[0].sql);
  const [result, setResult] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSelectQuestion = (q: typeof PREDEFINED_QUESTIONS[0]) => {
    setActiveQuestion(q);
    setQuery(q.sql);
    setResult(null);
    setError(null);
  };

  const handleExecute = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      const res = await executeSql(query);
      if (res.error) {
        setError(res.error);
      } else if (res.data) {
        setResult(res.data);
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Ask the Recruiting Database</h1>
        <p className="text-muted">Direct SQL access to the underlying PostgreSQL schema (currently running SQLite for prototype).</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-4">
          <h2 className="text-sm font-semibold tracking-wide text-muted uppercase">Business Questions</h2>
          <div className="space-y-2">
            {PREDEFINED_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectQuestion(q)}
                className={clsx(
                  "w-full text-left p-4 rounded-lg border transition-all",
                  activeQuestion.title === q.title 
                    ? "bg-teslaRed/10 border-teslaRed text-white shadow-[0_0_15px_rgba(224,31,38,0.15)]" 
                    : "bg-panel border-panelBorder text-muted hover:border-white/20 hover:text-white"
                )}
              >
                <div className="flex items-start gap-3">
                  <Database className={clsx("h-5 w-5 shrink-0", activeQuestion.title === q.title ? "text-teslaRed" : "text-muted")} />
                  <span className="text-sm font-medium leading-snug">{q.title}</span>
                </div>
              </button>
            ))}
          </div>
          
          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-6 p-4 rounded-lg bg-panel/50 border border-panelBorder"
              >
                <div className="flex items-center gap-2 mb-2 text-teslaRed">
                  <FileText className="h-4 w-4" />
                  <h3 className="text-xs font-bold uppercase tracking-wider">Business Interpretation</h3>
                </div>
                <p className="text-sm text-muted">{activeQuestion.interpretation}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <Card className="border-panelBorder bg-[#0d0d0f] overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-4 py-2 bg-panel border-b border-panelBorder">
              <div className="flex items-center gap-2 text-xs font-mono text-muted">
                <Terminal className="h-4 w-4" />
                query.sql
              </div>
              <button
                onClick={handleExecute}
                disabled={loading}
                className="flex items-center gap-2 bg-teslaRed hover:bg-teslaRedDark text-white px-3 py-1.5 rounded text-xs font-bold transition-colors disabled:opacity-50"
              >
                {loading ? (
                  <span className="animate-pulse">EXECUTING...</span>
                ) : (
                  <>
                    <Play className="h-3 w-3" />
                    RUN QUERY
                  </>
                )}
              </button>
            </div>
            <div className="p-4">
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full h-48 bg-transparent text-[#e5e5e5] font-mono text-sm resize-none focus:outline-none selection:bg-teslaRed/30"
                spellCheck={false}
              />
            </div>
          </Card>

          <Card className="min-h-[300px]">
            <CardHeader className="py-4 border-b border-panelBorder">
              <CardTitle className="text-sm font-mono flex items-center gap-2 text-muted">
                Result Output
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {error ? (
                <div className="p-6 flex items-start gap-3 text-red-400">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  <p className="font-mono text-sm">{error}</p>
                </div>
              ) : result ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-muted uppercase bg-panel/50 border-b border-panelBorder">
                      <tr>
                        {Object.keys(result[0] || {}).map((key) => (
                          <th key={key} className="px-6 py-3 font-medium whitespace-nowrap">
                            {key}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {result.length === 0 ? (
                        <tr>
                          <td className="px-6 py-8 text-center text-muted italic">0 rows returned.</td>
                        </tr>
                      ) : (
                        result.map((row, i) => (
                          <tr key={i} className="border-b border-panelBorder/50 hover:bg-panel/30 transition-colors">
                            {Object.values(row).map((val: any, j) => (
                              <td key={j} className="px-6 py-4 font-mono text-xs whitespace-nowrap text-[#d4d4d8]">
                                {val !== null ? String(val) : <span className="text-muted/50">NULL</span>}
                              </td>
                            ))}
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-12 flex flex-col items-center justify-center text-muted/50 h-full">
                  <Terminal className="h-8 w-8 mb-2 opacity-50" />
                  <p className="text-sm">Run a query to view results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
