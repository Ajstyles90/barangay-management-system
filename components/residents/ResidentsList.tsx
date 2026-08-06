import { Resident } from "@/types/resident";
import { Pencil, Trash2, Search } from "lucide-react";

interface ResidentsListProps {
  residents: Resident[];
  onDelete: (id: number) => void;
  onEdit: (resident: Resident) => void;
}

export default function ResidentsList({ residents, onDelete, onEdit }: ResidentsListProps) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white/90 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.35)]">
      <div className="flex flex-col gap-4 border-b border-slate-200 p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Residents</h2>
          <p className="mt-1 text-sm text-slate-600">View and manage all registered residents from one secure workspace.</p>
        </div>

        <div className="relative w-full max-w-sm">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="Search resident..." className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-100" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-4 font-semibold text-slate-700">Resident</th>
              <th className="px-4 py-4 font-semibold text-slate-700">Age</th>
              <th className="px-4 py-4 font-semibold text-slate-700">Purok</th>
              <th className="px-4 py-4 font-semibold text-slate-700">Status</th>
              <th className="px-4 py-4 text-center font-semibold text-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {residents.map((resident) => (
              <tr key={resident.id} className="border-t border-slate-200 transition hover:bg-slate-50">
                <td className="px-4 py-4">
                  <div className="flex items-center gap-4">
                    {resident.photo_url ? (
                      <img src={resident.photo_url} alt={resident.name} className="h-14 w-14 rounded-full border border-slate-200 object-cover" />
                    ) : (
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-200 text-2xl">👤</div>
                    )}
                    <div>
                      <h3 className="font-semibold text-slate-900">{resident.name}</h3>
                      <p className="text-sm text-slate-500">Resident ID #{resident.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-slate-700">{resident.age}</td>
                <td className="px-4 py-4 text-slate-700">{resident.purok}</td>
                <td className="px-4 py-4">
                  <span className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${resident.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>
                    {resident.status}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex justify-center gap-2">
                    <button onClick={() => onEdit(resident)} className="flex items-center gap-1 rounded-xl bg-cyan-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-cyan-500">
                      <Pencil size={16} /> Edit
                    </button>
                    <button onClick={() => onDelete(resident.id)} className="flex items-center gap-1 rounded-xl bg-rose-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-rose-500">
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 border-t border-slate-200 p-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-600">Showing {residents.length} residents</p>
        <div className="flex gap-2">
          <button className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100">Previous</button>
          <button className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white">1</button>
          <button className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100">Next</button>
        </div>
      </div>
    </div>
  );
}