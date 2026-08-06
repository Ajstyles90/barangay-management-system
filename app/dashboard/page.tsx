"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Home, UserCheck, UserX, Users } from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import StatCard from "@/components/dashboard/StatCard";
import QuickActions from "@/components/dashboard/QuickActions";
import ResidentsChart from "@/components/dashboard/ResidentsChart";
import RecentActivity from "@/components/dashboard/RecentActivity";
import ResidentsTable from "@/components/dashboard/ResidentsTable";
import AnnouncementCard from "@/components/dashboard/AnnouncementCard";
import { getDashboardStats } from "@/lib/residents";

export default function Dashboard() {
  const [stats, setStats] = useState({
    residentCount: 0,
    activeCount: 0,
    inactiveCount: 0,
  });

  useEffect(() => {
    async function loadStats() {
      const data = await getDashboardStats();
      setStats(data);
    }

    loadStats();
  }, []);

  return (
    <PageShell title="Dashboard" subtitle="Welcome back, Administrator. Here's an overview of your barangay." action={<Link href="/residents" className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">View Residents <ArrowRight size={16} /></Link>}>
      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white/90 p-6 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.35)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-600">Operational snapshot</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Daily barangay activity at a glance</h2>
            </div>
            <div className="rounded-2xl bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">Updated today</div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard title="Residents" value={stats.residentCount} icon={Users} />
            <StatCard title="Active Residents" value={stats.activeCount} icon={UserCheck} />
            <StatCard title="Inactive Residents" value={stats.inactiveCount} icon={UserX} />
            <StatCard title="Households" value={0} icon={Home} />
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_20px_60px_-30px_rgba(15,23,42,0.45)]">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">Priority tasks</p>
          <ul className="mt-5 space-y-3 text-sm text-slate-300">
            <li>• Review new resident submissions</li>
            <li>• Verify pending certificates</li>
            <li>• Follow up on blotter updates</li>
            <li>• Publish new announcements</li>
          </ul>
        </div>
      </div>

      <div className="mt-8">
        <QuickActions />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ResidentsChart />
        </div>
        <RecentActivity />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ResidentsTable />
        </div>
        <AnnouncementCard />
      </div>
    </PageShell>
  );
}