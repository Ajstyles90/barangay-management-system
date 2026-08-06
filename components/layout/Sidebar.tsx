import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Moon, Sun } from "lucide-react";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/residents", label: "Residents" },
  { href: "/households", label: "Households" },
  { href: "/certificates", label: "Certificates" },
  { href: "/blotters", label: "Blotter Records" },
  { href: "/announcements", label: "Announcements" },
];

interface SidebarProps {
  theme: "light" | "dark";
  setTheme: (value: "light" | "dark") => void;
}

export default function Sidebar({ theme, setTheme }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={`fixed left-0 top-0 hidden h-screen w-72 flex-col border-r px-5 py-6 shadow-[20px_0_80px_-40px_rgba(2,6,23,0.95)] lg:flex ${theme === "dark" ? "border-slate-800 bg-slate-950/95 text-slate-100" : "border-slate-200 bg-white/90 text-slate-900"}`}>
      <div className={`rounded-[24px] border p-4 backdrop-blur ${theme === "dark" ? "border-white/10 bg-white/10" : "border-slate-200 bg-slate-50/80"}`}>
        <div className="flex items-center gap-3">
          <Image src="/logo2.jpg" alt="Barangay Logo" width={48} height={48} className="h-12 w-12 rounded-full border-2 border-white object-cover" />
          <div>
            <h1 className="text-base font-semibold">Barangay Shembot Boys</h1>
            <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>Management System</p>
          </div>
        </div>
      </div>

      <nav className="mt-8 flex-1">
        <ul className="space-y-2">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link href={link.href} className={`flex items-center rounded-2xl px-4 py-3 text-sm font-medium transition ${active ? (theme === "dark" ? "bg-cyan-500/20 text-cyan-300" : "bg-cyan-50 text-cyan-700") : theme === "dark" ? "text-slate-300 hover:bg-white/10 hover:text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}>
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className={`flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-medium transition ${theme === "dark" ? "border-slate-800 bg-slate-900 text-slate-100 hover:bg-slate-800" : "border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>
        {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        {theme === "dark" ? "Light mode" : "Dark mode"}
      </button>
    </aside>
  );
}