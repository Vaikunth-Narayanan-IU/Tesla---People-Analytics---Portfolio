"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ExternalLink } from "lucide-react";

const mockSourceData = [
  { name: 'Tesla Careers', hires: 145, conversion: 2.1 },
  { name: 'Employee Referral', hires: 82, conversion: 8.4 },
  { name: 'LinkedIn', hires: 110, conversion: 1.2 },
  { name: 'University Recruiting', hires: 55, conversion: 3.8 },
  { name: 'Agency', hires: 12, conversion: 4.1 },
  { name: 'Indeed', hires: 8, conversion: 0.5 },
];

export default function SourcesPage() {
  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Source Analytics</h1>
        <p className="text-muted">Analyze channel ROI, conversion rates, and volume.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-panel/50 border-emerald-500/30">
          <CardContent className="pt-6">
            <p className="text-sm text-muted font-medium mb-1">Highest Conversion</p>
            <h3 className="text-2xl font-bold text-emerald-500">Employee Referral (8.4%)</h3>
          </CardContent>
        </Card>
        <Card className="bg-panel/50">
          <CardContent className="pt-6">
            <p className="text-sm text-muted font-medium mb-1">Highest Volume</p>
            <h3 className="text-2xl font-bold">Tesla Careers (145 Hires)</h3>
          </CardContent>
        </Card>
        <Card className="bg-panel/50 border-teslaRed/30">
          <CardContent className="pt-6">
            <p className="text-sm text-muted font-medium mb-1">Lowest Efficiency</p>
            <h3 className="text-2xl font-bold text-teslaRed">Indeed (0.5%)</h3>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Total Hires by Source</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockSourceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="name" stroke="#a1a1aa" fontSize={12} tickMargin={10} />
                <YAxis stroke="#a1a1aa" fontSize={12} />
                <Tooltip 
                  cursor={{ fill: '#27272a', opacity: 0.4 }}
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }}
                />
                <Bar dataKey="hires" fill="#ffffff" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
