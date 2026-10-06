"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Filter } from "lucide-react";

const mockFunnelData = [
  { stage: "Sourcing", candidates: 24500, conversion: 100, medianDays: 12 },
  { stage: "Application", candidates: 15481, conversion: 63, medianDays: 3 },
  { stage: "Recruiter Review", candidates: 9245, conversion: 60, medianDays: 4 },
  { stage: "Recruiter Screen", candidates: 4812, conversion: 52, medianDays: 5 },
  { stage: "Hiring Manager Review", candidates: 2104, conversion: 44, medianDays: 8 },
  { stage: "Interview", candidates: 1102, conversion: 52, medianDays: 14 },
  { stage: "Final Interview", candidates: 680, conversion: 62, medianDays: 7 },
  { stage: "Offer", candidates: 528, conversion: 78, medianDays: 3 },
  { stage: "Hire", candidates: 412, conversion: 78, medianDays: 14 },
];

export default function FunnelPage() {
  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Recruiting Funnel</h1>
          <p className="text-muted">Analyze conversion rates and identify pipeline bottlenecks.</p>
        </div>
        <button className="flex items-center gap-2 bg-panel border border-panelBorder px-4 py-2 rounded-md text-sm font-medium hover:bg-white/5 transition-colors">
          <Filter className="h-4 w-4" />
          Filter: Software Engineering (Austin)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Funnel Volume & Conversion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockFunnelData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" horizontal={false} />
                  <XAxis type="number" stroke="#a1a1aa" fontSize={12} />
                  <YAxis dataKey="stage" type="category" stroke="#a1a1aa" fontSize={12} width={140} />
                  <Tooltip 
                    cursor={{ fill: '#27272a', opacity: 0.4 }}
                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }}
                    formatter={(value: any, name: any, props: any) => [
                      `${value} (${props.payload.conversion}%)`, 'Candidates'
                    ]}
                  />
                  <Bar dataKey="candidates" fill="#e01f26" radius={[0, 4, 4, 0]} animationDuration={1500} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="border-t-4 border-t-yellow-500 bg-panel/50">
            <CardContent className="pt-6">
              <h3 className="font-bold text-lg mb-2">Key Observation</h3>
              <p className="text-sm text-muted leading-relaxed">
                Technical interviews are currently the largest bottleneck for Austin engineering roles. 
                Candidate wait time after hiring-manager review increased 27% this month.
              </p>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-teslaRed bg-panel/50">
            <CardContent className="pt-6">
              <h3 className="font-bold text-lg mb-2">Conversion Warning</h3>
              <p className="text-sm text-muted leading-relaxed">
                Recruiter screen → interview conversion is 11 points below the historical baseline.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
