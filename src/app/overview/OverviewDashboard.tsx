"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid } from "recharts";
import { Activity, AlertTriangle, CheckCircle, Clock } from "lucide-react";

export default function OverviewDashboard({ kpis, funnel, health }: any) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Executive Overview</h1>
        <p className="text-muted">Real-time pulse of recruiting operations and pipeline health.</p>
      </div>

      <motion.div 
        variants={container} 
        initial="hidden" 
        animate="show" 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <motion.div variants={item}>
          <Card className="relative overflow-hidden group hover:border-teslaRed/50 transition-colors">
            <div className="absolute top-0 left-0 w-1 h-full bg-teslaRed" />
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted font-medium">Active Requisitions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{kpis.activeReqs}</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="hover:border-white/20 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted font-medium">Candidates in Pipeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{kpis.totalCandidates.toLocaleString()}</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="hover:border-white/20 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted font-medium">Median Time to Fill</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{kpis.medianTimeToFill} <span className="text-sm font-normal text-muted">days</span></div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="hover:border-white/20 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted font-medium">Offer Acceptance Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{kpis.offerAcceptanceRate}%</div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 space-y-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>Recruiting Funnel Conversion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={funnel} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" horizontal={false} />
                    <XAxis type="number" stroke="#a1a1aa" fontSize={12} />
                    <YAxis dataKey="stage" type="category" stroke="#a1a1aa" fontSize={12} width={120} />
                    <Tooltip 
                      cursor={{ fill: '#27272a', opacity: 0.4 }}
                      contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }}
                      formatter={(value: any, name: any, props: any) => [
                        `${value} (${props.payload.conversion}% conversion)`, 'Candidates'
                      ]}
                    />
                    <Bar dataKey="count" fill="#e01f26" radius={[0, 4, 4, 0]} animationDuration={1500} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Requisition Health</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="flex items-center gap-2 text-green-500"><CheckCircle className="h-4 w-4"/> On Track</span>
                  <span className="font-bold">{health.onTrack}</span>
                </div>
                <div className="w-full bg-panelBorder h-2 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${(health.onTrack / (health.onTrack + health.atRisk + health.critical)) * 100}%` }} className="bg-green-500 h-full" transition={{ duration: 1 }} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="flex items-center gap-2 text-yellow-500"><Clock className="h-4 w-4"/> At Risk</span>
                  <span className="font-bold">{health.atRisk}</span>
                </div>
                <div className="w-full bg-panelBorder h-2 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${(health.atRisk / (health.onTrack + health.atRisk + health.critical)) * 100}%` }} className="bg-yellow-500 h-full" transition={{ duration: 1, delay: 0.2 }} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="flex items-center gap-2 text-teslaRed"><AlertTriangle className="h-4 w-4"/> Critical</span>
                  <span className="font-bold">{health.critical}</span>
                </div>
                <div className="w-full bg-panelBorder h-2 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${(health.critical / (health.onTrack + health.atRisk + health.critical)) * 100}%` }} className="bg-teslaRed h-full" transition={{ duration: 1, delay: 0.4 }} />
                </div>
                <p className="text-xs text-muted mt-2">Critical: Open &gt; 45 days with 0 active candidates.</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
