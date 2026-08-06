"use client";

import { useEffect, useState } from "react";
import PageShell from "@/components/layout/PageShell";
import { addAnnouncement, AnnouncementRecord, getAnnouncements } from "@/lib/barangay";

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<AnnouncementRecord[]>([]);
  const [form, setForm] = useState({ title: "", date: "", pinned: false });

  async function loadData() {
    const data = await getAnnouncements();
    setAnnouncements(data);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.date) return;

    await addAnnouncement({ title: form.title, date: form.date, pinned: form.pinned });
    setForm({ title: "", date: "", pinned: false });
    await loadData();
  }

  return (
    <PageShell title="Announcements" subtitle="Keep residents informed with pinned updates and scheduled notices." action={<button className="rounded-2xl bg-cyan-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-100 transition hover:bg-cyan-500">+ Create Announcement</button>}>
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <form onSubmit={handleSubmit} className="rounded-[28px] border border-slate-200 bg-white/90 p-6 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.3)]">
          <h2 className="text-xl font-semibold text-slate-900">Post Announcement</h2>
          <div className="mt-4 space-y-3">
            <input value={form.title} onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))} placeholder="Announcement Title" className="w-full rounded-2xl border border-slate-200 px-4 py-3" />
            <input type="date" value={form.date} onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))} className="w-full rounded-2xl border border-slate-200 px-4 py-3" />
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" checked={form.pinned} onChange={(e) => setForm((prev) => ({ ...prev, pinned: e.target.checked }))} />
              Pin this announcement
            </label>
            <button type="submit" className="rounded-2xl bg-cyan-600 px-4 py-3 font-semibold text-white">Publish</button>
          </div>
        </form>

        <div className="space-y-4">
          {announcements.map((announcement) => (
            <div key={announcement.id} className="rounded-[24px] border border-slate-200 bg-white/90 p-6 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.3)]">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">{announcement.title}</h2>
                  <p className="mt-1 text-sm text-slate-600">Scheduled for {announcement.date}</p>
                </div>
                {announcement.pinned ? <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-700">Pinned</span> : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
