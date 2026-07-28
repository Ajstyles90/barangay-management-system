import { Bell, Search, UserCircle } from "lucide-react";
const today = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
});

export default function Navbar() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
      {/* Search */}
      <div className="relative w-96">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />

        <input
          type="text"
          placeholder="Search..."
          className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">

  <span className="text-sm text-gray-600 hidden md:block">
    {today}
  </span>
        <Bell className="cursor-pointer" />

        <div className="flex items-center gap-2">
          <UserCircle size={34} />

          <div>
            <p className="font-semibold">Administrator</p>
            <p className="text-xs text-gray-500">Barangay Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}