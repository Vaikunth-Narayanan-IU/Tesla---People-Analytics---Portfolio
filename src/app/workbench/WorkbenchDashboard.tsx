"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, AlertCircle, Clock, CheckCircle } from "lucide-react";
import { clsx } from "clsx";

export default function WorkbenchDashboard({ data }: any) {
  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Recruiter Workbench</h1>
        <p className="text-muted">Actionable queue for today's highest priority pipeline tasks.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-t-4 border-t-blue-500">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold mb-1">{data.priorities.needsReview}</div>
            <p className="text-sm font-medium text-muted">Candidates waiting for review</p>
          </CardContent>
        </Card>
        
        <Card className="border-t-4 border-t-yellow-500">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold mb-1">{data.priorities.hmWait}</div>
            <p className="text-sm font-medium text-muted">Waiting &gt; 5 days for HM</p>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-t-green-500">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold mb-1">{data.priorities.offersPending}</div>
            <p className="text-sm font-medium text-muted">Offers awaiting response</p>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-t-teslaRed">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold mb-1">{data.priorities.stalledReqs}</div>
            <p className="text-sm font-medium text-muted">Requisitions with no movement</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Actionable Candidate Pipeline</CardTitle>
          <button className="text-xs font-semibold text-teslaRed hover:text-white transition-colors">
            VIEW ALL
          </button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted uppercase bg-panel/50 border-b border-panelBorder">
                <tr>
                  <th className="px-6 py-4 font-medium">Candidate</th>
                  <th className="px-6 py-4 font-medium">Role</th>
                  <th className="px-6 py-4 font-medium">Stage</th>
                  <th className="px-6 py-4 font-medium">Days</th>
                  <th className="px-6 py-4 font-medium">Recruiter</th>
                  <th className="px-6 py-4 font-medium">Risk</th>
                  <th className="px-6 py-4 font-medium text-right">Next Action</th>
                </tr>
              </thead>
              <tbody>
                {data.candidates.map((c: any, i: number) => (
                  <motion.tr 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={c.id} 
                    className="border-b border-panelBorder hover:bg-panel/50 transition-colors group"
                  >
                    <td className="px-6 py-4 font-mono text-xs">{c.code}</td>
                    <td className="px-6 py-4 font-medium">{c.role}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-1 rounded bg-panelBorder text-xs text-muted">
                        {c.stage}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={clsx("font-mono font-bold", c.daysInStage > 7 ? "text-teslaRed" : "text-muted")}>
                        {c.daysInStage}d
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted">{c.recruiter}</td>
                    <td className="px-6 py-4">
                      <span className={clsx(
                        "text-xs font-bold tracking-wider",
                        c.risk === 'Stalled' ? "text-teslaRed" : c.risk === 'Needs Attention' ? "text-yellow-500" : "text-green-500"
                      )}>
                        {c.risk}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-xs font-bold text-white bg-white/5 hover:bg-teslaRed px-4 py-2 rounded transition-all">
                        {c.action}
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
