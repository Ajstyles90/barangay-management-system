import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/residents", label: "Residents" },
  { href: "/households", label: "Households" },
  { href: "/certificates", label: "Certificates" },
  { href: "/blotters", label: "Blotter Records" },
  { href: "/announcements", label: "Announcements" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-72 flex-col border-r border-slate-200 bg-slate-950/95 px-5 py-6 text-white shadow-[20px_0_80px_-40px_rgba(2,6,23,0.95)] lg:flex">
      <div className="rounded-[24px] border border-white/10 bg-white/10 p-4 backdrop-blur">
        <div className="flex items-center gap-3">
          <Image src="/logo2.jpg" alt="Barangay Logo" width={48} height={48} className="h-12 w-12 rounded-full border-2 border-white object-cover" />
          <div>
            <h1 className="text-base font-semibold">Barangay Shembot Boys</h1>
            <p className="text-xs text-slate-400">Management System</p>
          </div>
        </div>
      </div>

      <nav className="mt-8 flex-1">
        <ul className="space-y-2">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link href={link.href} className={`flex items-center rounded-2xl px-4 py-3 text-sm font-medium transition ${active ? "bg-cyan-500/20 text-cyan-300 shadow-inner" : "text-slate-300 hover:bg-white/10 hover:text-white"}`}>
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="rounded-[24px] border border-white/10 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 p-4 text-sm text-slate-200">
        <p className="font-semibold text-white">Municipal Operations</p>
        <p className="mt-2 text-slate-300">Secure, professional, and accessible for everyday barangay work.</p>
      </div>
    </aside>
  );
}