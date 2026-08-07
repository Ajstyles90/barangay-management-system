import { Bell, Search, UserCircle } from "lucide-react";

const today = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
});

export default function Navbar() {
  return (
    <header className="border-b border-slate-200/80 bg-white/80 px-4 py-4 backdrop-blur md:px-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative max-w-xl flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input type="text" placeholder="Search residents, cases, or announcements" className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-100" />
        </div>

        <div className="flex items-center justify-between gap-4 lg:justify-end">
          <span className="hidden rounded-full bg-slate-100 px-3 py-2 text-sm font-medium text-slate-600 md:block">{today}</span>
          <button className="rounded-2xl border border-slate-200 bg-white p-2.5 text-slate-600 transition hover:bg-slate-100" aria-label="Notifications">
            <Bell size={18} />
          </button>

          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
            <UserCircle size={34} className="text-slate-600" />
            <div>
              <p className="text-sm font-semibold text-slate-900">Administrator</p>
              <p className="text-xs text-slate-500">Barangay Admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}