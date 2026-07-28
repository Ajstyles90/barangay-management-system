"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

import SectionHeader from "@/components/ui/SectionHeader";
import StatCard from "@/components/dashboard/StatCard";
import QuickActions from "@/components/dashboard/QuickActions";
import ResidentsChart from "@/components/dashboard/ResidentsChart";
import RecentActivity from "@/components/dashboard/RecentActivity";
import ResidentsTable from "@/components/dashboard/ResidentsTable";
import AnnouncementCard from "@/components/dashboard/AnnouncementCard";

import {
  Users,
  UserCheck,
  UserX,
  Home,
} from "lucide-react";

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
    <div className="flex">
      <Sidebar />

      <main className="ml-64 flex-1 min-h-screen bg-gray-200">
        <Navbar />

        <div className="p-8">
          <SectionHeader
            title="Dashboard"
            subtitle="Welcome back, Administrator. Here's an overview of your barangay."
          />

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">

            <StatCard
              title="Residents"
              value={stats.residentCount}
              icon={Users}
            />

            <StatCard
              title="Active Residents"
              value={stats.activeCount}
              icon={UserCheck}
            />

            <StatCard
              title="Inactive Residents"
              value={stats.inactiveCount}
              icon={UserX}
            />

            <StatCard
              title="Households"
              value={0}
              icon={Home}
            />

          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <QuickActions />
          </div>

          {/* Chart + Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">

            <div className="lg:col-span-2">
              <ResidentsChart />
            </div>

            <RecentActivity />

          </div>

          {/* Residents + Announcements */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">

            <div className="lg:col-span-2">
              <ResidentsTable />
            </div>

            <AnnouncementCard />

          </div>

        </div>
      </main>
    </div>
  );
}