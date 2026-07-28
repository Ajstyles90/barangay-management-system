import Link from "next/link";
import Image from "next/image";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-black text-white fixed left-0 top-0 shadow-xl">

      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-3">

          <Image
            src="/logo2.jpg"
            alt="Barangay Logo"
            width={48}
            height={48}
            className="w-12 h-12 rounded-full object-cover border-2 border-white"
          />

          <div>
            <h1 className="text-lg font-bold">
              Barangay Shembot Boys
            </h1>

            <p className="text-xs text-gray-400">
              Management System
            </p>
          </div>

        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-6">
        <ul className="space-y-2 px-4">

          <li>
            <Link
              href="/dashboard"
              className="block hover:bg-gray-800 p-3 rounded-lg transition"
            >
              Dashboard
            </Link>
          </li>

          <li>
            <Link
              href="/residents"
              className="block hover:bg-gray-800 p-3 rounded-lg transition"
            >
              Residents
            </Link>
          </li>

          <li className="hover:bg-gray-800 p-3 rounded-lg cursor-pointer transition">
            Households
          </li>

          <li className="hover:bg-gray-800 p-3 rounded-lg cursor-pointer transition">
            Certificates
          </li>

          <li className="hover:bg-gray-800 p-3 rounded-lg cursor-pointer transition">
            Blotter Records
          </li>

          <li className="hover:bg-gray-800 p-3 rounded-lg cursor-pointer transition">
            Announcements
          </li>

          <li className="hover:bg-gray-800 p-3 rounded-lg cursor-pointer transition">
            Users
          </li>

          <li className="hover:bg-gray-800 p-3 rounded-lg cursor-pointer transition">
            Settings
          </li>

        </ul>
      </nav>

    </aside>
  );
}