"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, AlertTriangle, CheckCircle, Clock } from "lucide-react";

const mockReqs = [
  { id: "REQ-2029", title: "Sr. Software Engineer, Autonomy", dept: "Engineering", location: "Palo Alto", openDays: 45, status: "Critical" },
  { id: "REQ-2030", title: "Data Engineer, People Analytics", dept: "People", location: "Austin", openDays: 12, status: "On Track" },
  { id: "REQ-2031", title: "Manufacturing Engineer", dept: "Manufacturing", location: "Fremont", openDays: 88, status: "Critical" },
  { id: "REQ-2032", title: "Supply Chain Analyst", dept: "Supply Chain", location: "Sparks", openDays: 22, status: "At Risk" },
  { id: "REQ-2033", title: "Product Manager, Energy", dept: "Energy", location: "Austin", openDays: 5, status: "On Track" },
  { id: "REQ-2034", title: "HR Business Partner", dept: "People", location: "Fremont", openDays: 31, status: "At Risk" },
];

export default function RequisitionsPage() {
  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Requisition Health</h1>
          <p className="text-muted">Track open roles, hiring velocity, and priority alerts.</p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <input 
            type="text" 
            placeholder="Search Requisitions..." 
            className="pl-10 pr-4 py-2 bg-panel border border-panelBorder rounded-md text-sm w-full md:w-64 focus:outline-none focus:border-teslaRed transition-colors"
          />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-panel/50 text-muted uppercase text-xs">
                <tr>
                  <th className="px-6 py-4 font-semibold tracking-wider">Req ID</th>
                  <th className="px-6 py-4 font-semibold tracking-wider">Role</th>
                  <th className="px-6 py-4 font-semibold tracking-wider">Department</th>
                  <th className="px-6 py-4 font-semibold tracking-wider">Location</th>
                  <th className="px-6 py-4 font-semibold tracking-wider">Days Open</th>
                  <th className="px-6 py-4 font-semibold tracking-wider">Health</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-panelBorder">
                {mockReqs.map((req, i) => (
                  <motion.tr 
                    key={req.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-white/5 transition-colors cursor-pointer group"
                  >
                    <td className="px-6 py-4 font-mono text-xs">{req.id}</td>
                    <td className="px-6 py-4 font-medium group-hover:text-teslaRed transition-colors">{req.title}</td>
                    <td className="px-6 py-4 text-muted">{req.dept}</td>
                    <td className="px-6 py-4 text-muted">{req.location}</td>
                    <td className="px-6 py-4 font-mono text-muted">{req.openDays}d</td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border
                        ${req.status === 'Critical' ? 'bg-teslaRed/10 text-teslaRed border-teslaRed/20' : 
                          req.status === 'At Risk' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' : 
                          'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'}`}
                      >
                        {req.status === 'Critical' && <AlertTriangle className="h-3 w-3" />}
                        {req.status === 'At Risk' && <Clock className="h-3 w-3" />}
                        {req.status === 'On Track' && <CheckCircle className="h-3 w-3" />}
                        {req.status}
                      </div>
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
