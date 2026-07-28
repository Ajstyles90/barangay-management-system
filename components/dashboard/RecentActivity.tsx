import {
  UserPlus,
  FileText,
  ShieldAlert,
  Pencil,
} from "lucide-react";

const activities = [
  {
    icon: UserPlus,
    title: "New Resident Added",
    description: "Juan Dela Cruz was added to the residents list.",
    time: "2 mins ago",
  },
  {
    icon: FileText,
    title: "Certificate Issued",
    description: "Barangay Clearance issued to Maria Santos.",
    time: "15 mins ago",
  },
  {
    icon: ShieldAlert,
    title: "Blotter Record",
    description: "A new blotter case has been created.",
    time: "1 hour ago",
  },
  {
    icon: Pencil,
    title: "Resident Updated",
    description: "Pedro Reyes updated his resident profile.",
    time: "3 hours ago",
  },
];

export default function RecentActivity() {
  return (
    <div className="bg-white rounded-2xl border border-gray-300 shadow-sm p-6 h-full">
      <h2 className="text-2xl font-bold text-black mb-6">
        Recent Activity
      </h2>

      <div className="space-y-5">
        {activities.map((activity, index) => {
          const Icon = activity.icon;

          return (
            <div
              key={index}
              className="flex items-start gap-4 pb-4 border-b last:border-b-0"
            >
              <div className="bg-black text-white p-3 rounded-full">
                <Icon size={18} />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-black">
                  {activity.title}
                </h3>

                <p className="text-gray-700 text-sm">
                  {activity.description}
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  {activity.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}