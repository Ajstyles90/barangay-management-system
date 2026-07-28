import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
      <div className="bg-white rounded-3xl shadow-xl p-12 max-w-3xl w-full text-center border border-gray-200">

        <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center mx-auto mb-8">
          <span className="text-white text-3xl font-bold">SB</span>
        </div>

        <h1 className="text-5xl font-extrabold text-black">
          Barangay Shembot Boys
        </h1>

        <p className="mt-3 text-xl text-gray-600">
          Management System
        </p>

        <p className="mt-6 text-gray-500">
          Manage residents, households, certificates, blotter records,
          announcements, and barangay services from one modern dashboard.
        </p>

        <Link
          href="/dashboard"
          className="inline-block mt-10 bg-black text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-800 transition"
        >
          Enter Dashboard
        </Link>

      </div>
    </main>
  );
}