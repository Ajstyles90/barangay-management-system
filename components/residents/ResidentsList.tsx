import { Resident } from "@/types/resident";
import {
  Pencil,
  Trash2,
  Search,
} from "lucide-react";

interface ResidentsListProps {
  residents: Resident[];
  onDelete: (id: number) => void;
  onEdit: (resident: Resident) => void;
}

export default function ResidentsList({
  residents,
  onDelete,
  onEdit,
}: ResidentsListProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-300">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between p-6 border-b">

        <div>
          <h2 className="text-2xl font-bold text-black">
            Residents
          </h2>

          <p className="text-gray-600 mt-1">
            View and manage all registered residents.
          </p>
        </div>

        <div className="flex gap-3 mt-4 md:mt-0">

          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-3 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search resident..."
              className="pl-10 pr-4 py-2 border rounded-xl w-64 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

        </div>

      </div>

      {/* Table */}
      <table className="w-full">

        <thead className="bg-gray-100">
          <tr>

            <th className="p-4 text-left font-semibold text-black">
              Resident
            </th>

            <th className="p-4 text-left font-semibold text-black">
              Age
            </th>

            <th className="p-4 text-left font-semibold text-black">
              Purok
            </th>

            <th className="p-4 text-left font-semibold text-black">
              Status
            </th>

            <th className="p-4 text-center font-semibold text-black">
              Actions
            </th>

          </tr>
        </thead>

        <tbody>

          {residents.map((resident) => (

            <tr
              key={resident.id}
              className="border-b hover:bg-gray-50 transition"
            >

              {/* Resident */}

              <td className="p-4">

                <div className="flex items-center gap-4">

                  {resident.photo_url ? (
                    <img
                      src={resident.photo_url}
                      alt={resident.name}
                      className="w-14 h-14 rounded-full object-cover border"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-2xl">
                      👤
                    </div>
                  )}

                  <div>

                    <h3 className="font-semibold text-black">
                      {resident.name}
                    </h3>

                    <p className="text-gray-500 text-sm">
                      Resident ID #{resident.id}
                    </p>

                  </div>

                </div>

              </td>

              <td className="p-4 text-black">
                {resident.age}
              </td>

              <td className="p-4 text-black">
                {resident.purok}
              </td>

              <td className="p-4">

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    resident.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {resident.status}
                </span>

              </td>

              <td className="p-4">

                <div className="flex justify-center gap-2">

                  <button
                    onClick={() => onEdit(resident)}
                    className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition"
                  >
                    <Pencil size={16} />
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(resident.id)}
                    className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg transition"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      {/* Footer */}

      <div className="flex justify-between items-center p-6 border-t">

        <p className="text-gray-600 text-sm">
          Showing {residents.length} residents
        </p>

        <div className="flex gap-2">

          <button className="border px-4 py-2 rounded-lg hover:bg-gray-100">
            Previous
          </button>

          <button className="bg-black text-white px-4 py-2 rounded-lg">
            1
          </button>

          <button className="border px-4 py-2 rounded-lg hover:bg-gray-100">
            Next
          </button>

        </div>

      </div>

    </div>
  );
}