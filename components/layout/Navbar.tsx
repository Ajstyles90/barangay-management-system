import { Bell, Search, SunMoon, UserCircle } from "lucide-react";

const today = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
});

interface NavbarProps {
  theme: "light" | "dark";
  setTheme: (value: "light" | "dark") => void;
}

export default function Navbar({ theme, setTheme }: NavbarProps) {
  return (
    <header className={`border-b px-4 py-4 backdrop-blur md:px-8 ${theme === "dark" ? "border-slate-800 bg-slate-900/70" : "border-slate-200/80 bg-white/80"}`}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative max-w-xl flex-1">
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 ${theme === "dark" ? "text-slate-400" : "text-slate-400"}`} size={18} />
          <input type="text" placeholder="Search residents, cases, or announcements" className={`w-full rounded-2xl border py-3 pl-10 pr-4 text-sm outline-none transition ${theme === "dark" ? "border-slate-800 bg-slate-950 text-slate-100 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20" : "border-slate-200 bg-slate-50 text-slate-700 focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-100"}`} />
        </div>

        <div className="flex items-center justify-between gap-4 lg:justify-end">
          <span className={`hidden rounded-full px-3 py-2 text-sm font-medium md:block ${theme === "dark" ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-600"}`}>{today}</span>
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className={`rounded-2xl border p-2.5 transition ${theme === "dark" ? "border-slate-800 bg-slate-950 text-slate-100 hover:bg-slate-800" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-100"}`} aria-label="Toggle theme">
            <SunMoon size={18} />
          </button>

          <div className={`flex items-center gap-3 rounded-2xl border px-3 py-2 shadow-sm ${theme === "dark" ? "border-slate-800 bg-slate-950" : "border-slate-200 bg-white"}`}>
            <UserCircle size={34} className={theme === "dark" ? "text-slate-200" : "text-slate-600"} />
            <div>
              <p className={`text-sm font-semibold ${theme === "dark" ? "text-slate-100" : "text-slate-900"}`}>Administrator</p>
              <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>Barangay Admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}