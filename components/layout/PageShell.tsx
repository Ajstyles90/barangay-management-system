"use client";

import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import SectionHeader from "@/components/ui/SectionHeader";

interface PageShellProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  action?: ReactNode;
}

export default function PageShell({
  title,
  subtitle,
  children,
  action,
}: PageShellProps) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(6,182,212,0.16),_transparent_30%),linear-gradient(135deg,_#f8fbff_0%,_#eef4ff_45%,_#f7fafc_100%)] text-slate-900">
      <Sidebar />

      <main className="lg:ml-72 min-h-screen">
        <Navbar />

        <div className="px-4 py-6 md:px-8 md:py-8">
          <div className="mb-6 flex flex-col gap-4 rounded-[28px] border border-white/70 bg-white/70 p-6 shadow-[0_25px_70px_-30px_rgba(15,23,42,0.55)] backdrop-blur xl:flex-row xl:items-end xl:justify-between">
            <SectionHeader title={title} subtitle={subtitle} />
            {action}
          </div>

          {children}
        </div>
      </main>
    </div>
  );
}
