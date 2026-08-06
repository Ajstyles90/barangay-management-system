"use client";

import { useEffect, useState } from "react";
import PageShell from "@/components/layout/PageShell";
import { addBlotter, BlotterRecord, getBlotters } from "@/lib/barangay";

export default function BlottersPage() {
  const [blotters, setBlotters] = useState<BlotterRecord[]>([]);
  const [form, setForm] = useState({ case_number: "", complainant: "", status: "Pending", category: "" });

  async function loadData() {
    const data = await getBlotters();
    setBlotters(data);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.case_number || !form.complainant || !form.category) return;

    await addBlotter({ case_number: form.case_number, complainant: form.complainant, status: form.status, category: form.category });
    setForm({ case_number: "", complainant: "", status: "Pending", category: "" });
    await loadData();
  }

  return (
    <PageShell title="Blotter Records" subtitle="Track incidents and keep a clear status history for every case." action={<button className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-200 transition hover:bg-slate-700">+ Add Case</button>}>
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <form onSubmit={handleSubmit} className="rounded-[28px] border border-slate-200 bg-white/90 p-6 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.35)]">
          <h2 className="text-xl font-semibold text-slate-900">Add Blotter Case</h2>
          <div className="mt-4 space-y-3">
            <input value={form.case_number} onChange={(e) => setForm((prev) => ({ ...prev, case_number: e.target.value }))} placeholder="Case Number" className="w-full rounded-2xl border border-slate-200 px-4 py-3" />
            <input value={form.complainant} onChange={(e) => setForm((prev) => ({ ...prev, complainant: e.target.value }))} placeholder="Complainant" className="w-full rounded-2xl border border-slate-200 px-4 py-3" />
            <input value={form.category} onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))} placeholder="Category" className="w-full rounded-2xl border border-slate-200 px-4 py-3" />
            <select value={form.status} onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value }))} className="w-full rounded-2xl border border-slate-200 px-4 py-3">
              <option>Pending</option>
              <option>Ongoing</option>
              <option>Settled</option>
              <option>Closed</option>
            </select>
            <button type="submit" className="rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white">Save Case</button>
          </div>
        </form>

        <div className="grid gap-4 lg:grid-cols-2">
          {blotters.map((item) => (
            <div key={item.id} className="rounded-[24px] border border-slate-200 bg-white/90 p-6 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.35)]">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">{item.case_number}</p>
              <h2 className="mt-3 text-lg font-semibold text-slate-900">{item.complainant}</h2>
              <p className="mt-2 text-sm text-slate-600">{item.category}</p>
              <div className="mt-4 inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">{item.status}</div>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
