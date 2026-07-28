import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
}: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300 border border-gray-200">

      <div className="flex justify-between items-center">

        <div>
          <p className="text-gray-700 font-medium">{title}</p>

          <h2 className="text-4xl font-extrabold mt-2 text-gray-900">
            {value.toLocaleString()}
          </h2>

          <p className="text-emerald-600 text-sm mt-3">
            +12% this month
          </p>
        </div>

        <div className="bg-black text-white p-4 rounded-xl">
          <Icon size={30} />
        </div>

      </div>

    </div>
  );
}