"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const mockOfferData = [
  { month: 'Jan', acceptRate: 72, offers: 45 },
  { month: 'Feb', acceptRate: 75, offers: 52 },
  { month: 'Mar', acceptRate: 71, offers: 48 },
  { month: 'Apr', acceptRate: 78, offers: 61 },
  { month: 'May', acceptRate: 82, offers: 58 },
  { month: 'Jun', acceptRate: 79, offers: 65 },
  { month: 'Jul', acceptRate: 75, offers: 70 },
  { month: 'Aug', acceptRate: 77, offers: 68 },
];

export default function OffersPage() {
  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Offer Analytics</h1>
        <p className="text-muted">Monitor offer acceptance rates and closing trends over time.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-panel/50">
          <CardContent className="pt-6">
            <p className="text-sm text-muted font-medium mb-1">YTD Acceptance Rate</p>
            <h3 className="text-3xl font-bold text-white">76.4%</h3>
          </CardContent>
        </Card>
        <Card className="bg-panel/50 border-teslaRed/30">
          <CardContent className="pt-6">
            <p className="text-sm text-muted font-medium mb-1">Top Decline Reason</p>
            <h3 className="text-xl font-bold text-teslaRed">Compensation / Base Salary</h3>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Offer Acceptance Rate (Trailing 8 Months)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockOfferData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#e01f26" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#e01f26" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#a1a1aa" fontSize={12} />
                <YAxis stroke="#a1a1aa" fontSize={12} domain={[50, 100]} />
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="acceptRate" 
                  stroke="#e01f26" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorRate)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
