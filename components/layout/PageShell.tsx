"use client";

import { ReactNode, useEffect, useState } from "react";
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
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("barangay-theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
      return;
    }

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("barangay-theme", theme);
  }, [theme]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === "dark" ? "bg-slate-950 text-slate-100" : "bg-[radial-gradient(circle_at_top_left,_rgba(6,182,212,0.16),_transparent_30%),linear-gradient(135deg,_#f8fbff_0%,_#eef4ff_45%,_#f7fafc_100%)] text-slate-900"}`}>
      <Sidebar theme={theme} setTheme={setTheme} />

      <main className="min-h-screen lg:ml-72">
        <Navbar theme={theme} setTheme={setTheme} />

        <div className="px-4 py-6 md:px-8 md:py-8">
          <div className={`mb-6 flex flex-col gap-4 rounded-[28px] border p-6 shadow-[0_25px_70px_-30px_rgba(15,23,42,0.55)] backdrop-blur xl:flex-row xl:items-end xl:justify-between ${theme === "dark" ? "border-slate-800 bg-slate-900/80" : "border-white/70 bg-white/70"}`}>
            <SectionHeader title={title} subtitle={subtitle} />
            {action}
          </div>

          {children}
        </div>
      </main>
    </div>
  );
}
