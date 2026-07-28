export default function AnnouncementCard() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <h2 className="text-2xl font-bold text-black mb-6">
        Latest Announcements
      </h2>

      <div className="space-y-4">

        <div className="border-l-4 border-black pl-4">
          <h3 className="font-semibold text-black">
            Barangay Assembly
          </h3>

          <p className="text-gray-500 text-sm">
            July 15, 2026
          </p>
        </div>

        <div className="border-l-4 border-black pl-4">
          <h3 className="font-semibold text-black">
            Clean-up Drive
          </h3>

          <p className="text-gray-500 text-sm">
            July 20, 2026
          </p>
        </div>

        <div className="border-l-4 border-black pl-4">
          <h3 className="font-semibold text-black">
            Free Vaccination
          </h3>

          <p className="text-gray-500 text-sm">
            July 28, 2026
          </p>
        </div>

      </div>

    </div>
  );
}