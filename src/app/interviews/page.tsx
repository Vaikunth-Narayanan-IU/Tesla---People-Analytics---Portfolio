"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const mockInterviewData = [
  { dept: 'Engineering', phoneScreen: 4, hmReview: 12, onsite: 14, total: 30 },
  { dept: 'Manufacturing', phoneScreen: 2, hmReview: 4, onsite: 8, total: 14 },
  { dept: 'Supply Chain', phoneScreen: 3, hmReview: 5, onsite: 7, total: 15 },
  { dept: 'Energy', phoneScreen: 5, hmReview: 7, onsite: 10, total: 22 },
  { dept: 'People', phoneScreen: 2, hmReview: 3, onsite: 5, total: 10 },
];

export default function InterviewsPage() {
  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Interview Analytics</h1>
        <p className="text-muted">Median days spent in interview stages by department.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Median Days in Stage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[500px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockInterviewData} layout="vertical" margin={{ top: 20, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" horizontal={false} />
                <XAxis type="number" stroke="#a1a1aa" fontSize={12} />
                <YAxis dataKey="dept" type="category" stroke="#a1a1aa" fontSize={12} width={100} />
                <Tooltip 
                  cursor={{ fill: '#27272a', opacity: 0.4 }}
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }}
                />
                <Bar dataKey="phoneScreen" name="Phone Screen" stackId="a" fill="#3f3f46" />
                <Bar dataKey="hmReview" name="HM Review" stackId="a" fill="#e01f26" />
                <Bar dataKey="onsite" name="Onsite Interview" stackId="a" fill="#ffffff" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
