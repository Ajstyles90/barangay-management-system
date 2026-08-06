"use client";

import { useEffect, useState } from "react";
import PageShell from "@/components/layout/PageShell";
import { addHousehold, getHouseholds, HouseholdRecord } from "@/lib/barangay";

export default function HouseholdsPage() {
  const [households, setHouseholds] = useState<HouseholdRecord[]>([]);
  const [form, setForm] = useState({ household_number: "", family_head: "", members: "", address: "" });

  async function loadData() {
    const data = await getHouseholds();
    setHouseholds(data);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.household_number || !form.family_head || !form.members || !form.address) return;

    await addHousehold({
      household_number: form.household_number,
      family_head: form.family_head,
      members: Number(form.members),
      address: form.address,
    });

    setForm({ household_number: "", family_head: "", members: "", address: "" });
    await loadData();
  }

  return (
    <PageShell title="Households" subtitle="Track family units, household composition, and addresses in one place." action={<button className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-200 transition hover:bg-slate-700">+ Add Household</button>}>
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <form onSubmit={handleSubmit} className="rounded-[28px] border border-slate-200 bg-white/90 p-6 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.35)]">
          <h2 className="text-xl font-semibold text-slate-900">Create Household</h2>
          <div className="mt-4 space-y-3">
            <input value={form.household_number} onChange={(e) => setForm((prev) => ({ ...prev, household_number: e.target.value }))} placeholder="Household Number" className="w-full rounded-2xl border border-slate-200 px-4 py-3" />
            <input value={form.family_head} onChange={(e) => setForm((prev) => ({ ...prev, family_head: e.target.value }))} placeholder="Family Head" className="w-full rounded-2xl border border-slate-200 px-4 py-3" />
            <input type="number" value={form.members} onChange={(e) => setForm((prev) => ({ ...prev, members: e.target.value }))} placeholder="Total Members" className="w-full rounded-2xl border border-slate-200 px-4 py-3" />
            <input value={form.address} onChange={(e) => setForm((prev) => ({ ...prev, address: e.target.value }))} placeholder="Address" className="w-full rounded-2xl border border-slate-200 px-4 py-3" />
            <button type="submit" className="rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white">Save Household</button>
          </div>
        </form>

        <div className="grid gap-4 md:grid-cols-2">
          {households.map((household) => (
            <div key={household.id} className="rounded-[24px] border border-slate-200 bg-white/90 p-6 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.4)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600">{household.household_number}</p>
                  <h2 className="mt-2 text-xl font-semibold text-slate-900">{household.family_head}</h2>
                </div>
                <div className="rounded-2xl bg-cyan-50 px-3 py-2 text-sm font-semibold text-cyan-700">{household.members} members</div>
              </div>
              <p className="mt-4 text-sm text-slate-600">{household.address}</p>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
