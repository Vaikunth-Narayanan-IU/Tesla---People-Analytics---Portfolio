"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Activity, Users, Database } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Pipeline Animation */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none flex flex-col justify-center items-center">
        <div className="flex items-center gap-8 text-muted/30 font-bold text-4xl sm:text-6xl tracking-widest whitespace-nowrap overflow-hidden w-full max-w-[1200px] px-8">
          {["SOURCE", "SCREEN", "INTERVIEW", "OFFER", "HIRE"].map((stage, i) => (
            <div key={stage} className="flex items-center gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
              >
                {stage}
              </motion.div>
              {i < 4 && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "4rem" }}
                  transition={{ delay: i * 0.2 + 0.4, duration: 0.5 }}
                  className="h-1 bg-gradient-to-r from-transparent via-teslaRed to-transparent relative"
                >
                   <motion.div 
                     className="absolute top-1/2 -translate-y-1/2 left-0 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                     animate={{ left: ["0%", "100%"] }}
                     transition={{ repeat: Infinity, duration: 2, ease: "linear", delay: i * 0.5 }}
                   />
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="z-10 flex flex-col items-center text-center max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-panelBorder bg-panel/50 px-3 py-1 text-xs font-medium text-muted mb-8"
        >
          <Database className="h-3.5 w-3.5" />
          Powered by PostgreSQL & Prisma
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl sm:text-7xl font-bold tracking-tight mb-6"
        >
          PEOPLE DECISIONS
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-muted">
            BUILT ON BETTER DATA
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-muted mb-12 max-w-2xl leading-relaxed"
        >
          An interactive recruiting analytics platform exploring how pipeline data, 
          data quality, and operational metrics can help recruiting teams make better decisions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="/overview"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-teslaRed px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-teslaRedDark hover:shadow-[0_0_15px_rgba(224,31,38,0.4)]"
          >
            <Activity className="h-4 w-4" />
            EXPLORE RECRUITING DATA
          </Link>
          <Link
            href="/workbench"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-panelBorder bg-panel px-8 py-3 text-sm font-semibold transition-all hover:bg-panelBorder hover:text-white"
          >
            <Users className="h-4 w-4" />
            VIEW ANALYTICS WORKBENCH
          </Link>
        </motion.div>
      </div>

      {/* Portfolio Badge */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-muted/50 flex flex-col items-center gap-1"
      >
        <span>Portfolio Prototype</span>
        <span>Srivaikunthan Narayanan</span>
      </motion.div>
    </div>
  );
}
