import Link from "next/link";
import { ArrowRight, ShieldCheck, Users, FileText } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_right,_rgba(6,182,212,0.15),_transparent_28%),linear-gradient(135deg,_#f8fbff_0%,_#eef4ff_45%,_#f7fafc_100%)] px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 rounded-[36px] border border-white/70 bg-white/80 p-6 shadow-[0_35px_90px_-30px_rgba(15,23,42,0.55)] backdrop-blur md:p-10 lg:p-12">
        <header className="flex flex-col gap-4 rounded-[28px] border border-slate-200/80 bg-slate-950 px-6 py-8 text-white shadow-2xl shadow-slate-900/20 md:flex-row md:items-end md:justify-between md:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Barangay operations</p>
            <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">Centralized civic services for modern barangay management.</h1>
            <p className="mt-4 max-w-2xl text-base text-slate-300 sm:text-lg">Manage residents, households, certificates, blotter records, and announcements from a secure, premium dashboard built for real municipal work.</p>
          </div>
          <Link href="/dashboard" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400">Enter Dashboard <ArrowRight size={18} /></Link>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.3)]">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-cyan-100 p-3 text-cyan-700"><ShieldCheck size={22} /></div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-600">Trusted experience</p>
                <h2 className="text-2xl font-semibold text-slate-900">Professional, accessible, and ready for daily use</h2>
              </div>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                { icon: Users, title: "Residents", text: "Track population data and resident records" },
                { icon: FileText, title: "Certificates", text: "Issue and manage official barangay documents" },
                { icon: ShieldCheck, title: "Blotter", text: "Monitor incident status and case history" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="rounded-[22px] border border-slate-200 bg-slate-50 p-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-slate-700 shadow-sm"><Icon size={20} /></div>
                    <h3 className="mt-4 font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-700 p-6 text-white shadow-[0_20px_60px_-30px_rgba(15,23,42,0.4)]">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-200">System highlights</p>
            <ul className="mt-5 space-y-3 text-sm text-slate-100">
              <li>• Premium dashboard layout with modern cards and spacing</li>
              <li>• Resident management with add, edit, and delete workflows</li>
              <li>• Household, certificate, blotter, and announcements modules</li>
              <li>• Responsive design for desktop and mobile experience</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}