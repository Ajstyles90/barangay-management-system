import { UserPlus, FileText, ShieldAlert } from "lucide-react";

export default function QuickActions() {
  return (
    <div className="bg-white rounded-2xl border border-gray-300 shadow-sm p-6 mt-8">
      <h2 className="text-2xl font-bold text-black mb-6">
        Quick Actions
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <button className="flex items-center justify-center gap-3 bg-black text-white rounded-xl p-4 hover:bg-gray-800 transition">
          <UserPlus size={20} />
          Add Resident
        </button>

        <button className="flex items-center justify-center gap-3 bg-black text-white rounded-xl p-4 hover:bg-gray-800 transition">
          <FileText size={20} />
          Issue Certificate
        </button>

        <button className="flex items-center justify-center gap-3 bg-black text-white rounded-xl p-4 hover:bg-gray-800 transition">
          <ShieldAlert size={20} />
          New Blotter
        </button>

      </div>
    </div>
  );
}