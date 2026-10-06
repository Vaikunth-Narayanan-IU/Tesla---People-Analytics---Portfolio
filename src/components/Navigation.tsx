"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { Activity, Users, Target, Search, Calendar, Award, CheckCircle, Database, Terminal, User } from "lucide-react";
import { motion } from "framer-motion";

const NAV_ITEMS = [
  { href: "/overview", label: "Overview", icon: Activity },
  { href: "/funnel", label: "Funnel", icon: Target },
  { href: "/requisitions", label: "Requisitions", icon: CheckCircle },
  { href: "/sources", label: "Sources", icon: Search },
  { href: "/interviews", label: "Interviews", icon: Calendar },
  { href: "/offers", label: "Offers", icon: Award },
  { href: "/workbench", label: "Workbench", icon: Users },
  { href: "/data-quality", label: "Data Quality", icon: Database },
  { href: "/sql-lab", label: "SQL Lab", icon: Terminal },
  { href: "/about", label: "About", icon: User },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-panelBorder bg-background/80 backdrop-blur-md">
      <div className="flex h-14 items-center px-6 gap-8">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-teslaRed text-xs font-bold text-white">
            T
          </div>
          <Link href="/" className="font-semibold tracking-wide text-sm">
            PEOPLE INTELLIGENCE
          </Link>
        </div>
        
        <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "relative flex items-center gap-2 px-3 py-2 text-xs font-medium transition-colors whitespace-nowrap",
                  isActive ? "text-white" : "text-muted hover:text-white"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-teslaRed"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
