"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Database, Code, LineChart, Briefcase, ChevronRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="p-6 md:p-8 space-y-12 max-w-5xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4 max-w-3xl mx-auto mt-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          SRIVAIKUNTHAN NARAYANAN
        </h1>
        <p className="text-xl text-teslaRed font-medium tracking-widest uppercase">
          People Analytics & Data Operations
        </p>
        <p className="text-muted leading-relaxed">
          I build data-driven products that help People & Talent teams make better decisions. 
          By combining deep HR systems knowledge (Workday) with modern data engineering (Python, SQL, PostgreSQL), 
          I bridge the gap between raw data and operational strategy.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-y border-panelBorder/50">
        {[
          { icon: Database, label: "Data Quality & SQL" },
          { icon: Briefcase, label: "Workday HCM" },
          { icon: LineChart, label: "People Analytics" },
          { icon: Code, label: "Python & RAG Apps" }
        ].map((skill, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col items-center justify-center p-6 bg-panel/50 rounded-xl border border-panelBorder hover:border-teslaRed/50 transition-colors"
          >
            <skill.icon className="h-8 w-8 text-teslaRed mb-3" />
            <span className="text-sm font-semibold text-center">{skill.label}</span>
          </motion.div>
        ))}
      </div>

      <div className="space-y-8">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-3">
          <span className="w-8 h-1 bg-teslaRed inline-block"></span>
          PROFESSIONAL EXPERIENCE
        </h2>

        <div className="relative pl-8 md:pl-0">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-panelBorder -translate-x-1/2"></div>
          
          <div className="space-y-12">
            {/* Deloitte */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative flex flex-col md:flex-row items-center justify-between group"
            >
              <div className="md:w-5/12 mb-6 md:mb-0 text-left md:text-right pr-0 md:pr-8">
                <h3 className="text-xl font-bold text-white group-hover:text-teslaRed transition-colors">DELOITTE</h3>
                <p className="text-sm text-muted font-medium mb-4">Workday HCM / HR Data Analytics</p>
                <div className="inline-flex flex-wrap gap-2 justify-start md:justify-end">
                  {['Data Reconciliation', 'Integration Testing', 'Workday', 'SIT/UAT'].map(t => (
                    <span key={t} className="text-xs bg-panel px-2 py-1 rounded text-muted border border-panelBorder">{t}</span>
                  ))}
                </div>
              </div>
              
              <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-panel border-2 border-teslaRed -translate-x-[1.35rem] md:-translate-x-1/2 z-10 shadow-[0_0_10px_rgba(224,31,38,0.5)]"></div>
              
              <div className="md:w-5/12 pl-0 md:pl-8">
                <Card className="bg-panel/50 border-panelBorder/50">
                  <CardContent className="p-6 space-y-3">
                    <p className="text-sm text-muted">
                      Supported People / HR teams across Benefits, Payroll, Absence, and Compensation modules.
                    </p>
                    <ul className="text-sm text-muted space-y-2">
                      <li className="flex items-start gap-2"><ChevronRight className="h-4 w-4 text-teslaRed shrink-0 mt-0.5"/> Built 40+ reports and dashboards for stakeholders.</li>
                      <li className="flex items-start gap-2"><ChevronRight className="h-4 w-4 text-teslaRed shrink-0 mt-0.5"/> Managed business logic validation and downstream reporting.</li>
                      <li className="flex items-start gap-2"><ChevronRight className="h-4 w-4 text-teslaRed shrink-0 mt-0.5"/> Resolved 50+ defects, improving reporting accuracy by ~40%.</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            {/* Eli Lilly */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative flex flex-col md:flex-row-reverse items-center justify-between group"
            >
              <div className="md:w-5/12 mb-6 md:mb-0 text-left pl-0 md:pl-8">
                <h3 className="text-xl font-bold text-white group-hover:text-teslaRed transition-colors">ELI LILLY</h3>
                <p className="text-sm text-muted font-medium mb-4">Python / RAG Application Engineering</p>
                <div className="inline-flex flex-wrap gap-2 justify-start">
                  {['Python', 'PostgreSQL', 'Vector DBs', 'AWS S3'].map(t => (
                    <span key={t} className="text-xs bg-panel px-2 py-1 rounded text-muted border border-panelBorder">{t}</span>
                  ))}
                </div>
              </div>
              
              <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-panel border-2 border-teslaRed -translate-x-[1.35rem] md:-translate-x-1/2 z-10 shadow-[0_0_10px_rgba(224,31,38,0.5)]"></div>
              
              <div className="md:w-5/12 pr-0 md:pr-8">
                <Card className="bg-panel/50 border-panelBorder/50">
                  <CardContent className="p-6 space-y-3">
                    <p className="text-sm text-muted">
                      Built an internal RAG-based application supporting clinical document workflows.
                    </p>
                    <ul className="text-sm text-muted space-y-2">
                      <li className="flex items-start gap-2"><ChevronRight className="h-4 w-4 text-teslaRed shrink-0 mt-0.5"/> Architected data ingestion, retrieval, and document generation pipelines.</li>
                      <li className="flex items-start gap-2"><ChevronRight className="h-4 w-4 text-teslaRed shrink-0 mt-0.5"/> Integrated human-review loops with generative outputs.</li>
                      <li className="flex items-start gap-2"><ChevronRight className="h-4 w-4 text-teslaRed shrink-0 mt-0.5"/> Projected a 50% cycle-time reduction (from 12 weeks to 6 weeks).</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
