import { residents } from "@/data/residents";

export default function ResidentsTable() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <h2 className="text-2xl font-bold text-black mb-6">
        Recent Residents
      </h2>

      <table className="w-full">

        <thead>

          <tr className="border-b">

            <th className="text-left py-3 font-semibold text-black">Name</th>

            <th className="text-left py-3 font-semibold text-black">Age</th>

            <th className="text-left py-3 font-semibold text-black">Purok</th>

            <th className="text-left py-3 font-semibold text-black">Status</th>

          </tr>

        </thead>

        <tbody>

          {residents.map((resident) => (

            <tr
              key={resident.id}
              className="border-b hover:bg-gray-50 transition"
            >

              <td className="py-4 font-medium text-black">{resident.name}</td>

              <td className="text-black">{resident.age}</td>

              <td className="text-black">{resident.purok}</td>

              <td>

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">

                  {resident.status}

                </span>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}