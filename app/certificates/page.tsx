"use client";

import { useEffect, useState } from "react";
import PageShell from "@/components/layout/PageShell";
import { addCertificate, CertificateRecord, getCertificates } from "@/lib/barangay";

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<CertificateRecord[]>([]);
  const [form, setForm] = useState({ type: "Barangay Clearance", resident_name: "", issued_at: "" });

  async function loadData() {
    const data = await getCertificates();
    setCertificates(data);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.resident_name || !form.issued_at) return;

    await addCertificate({ type: form.type, resident_name: form.resident_name, issued_at: form.issued_at });
    setForm({ type: "Barangay Clearance", resident_name: "", issued_at: "" });
    await loadData();
  }

  return (
    <PageShell title="Certificates" subtitle="Generate and issue official barangay certificates with a polished layout." action={<button className="rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-100 transition hover:bg-emerald-500">+ New Certificate</button>}>
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <form onSubmit={handleSubmit} className="rounded-[28px] border border-slate-200 bg-white/90 p-6 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.35)]">
          <h2 className="text-xl font-semibold text-slate-900">Issue Certificate</h2>
          <div className="mt-4 space-y-3">
            <select value={form.type} onChange={(e) => setForm((prev) => ({ ...prev, type: e.target.value }))} className="w-full rounded-2xl border border-slate-200 px-4 py-3">
              <option>Barangay Clearance</option>
              <option>Certificate of Residency</option>
              <option>Certificate of Indigency</option>
              <option>Business Clearance</option>
            </select>
            <input value={form.resident_name} onChange={(e) => setForm((prev) => ({ ...prev, resident_name: e.target.value }))} placeholder="Resident Name" className="w-full rounded-2xl border border-slate-200 px-4 py-3" />
            <input type="date" value={form.issued_at} onChange={(e) => setForm((prev) => ({ ...prev, issued_at: e.target.value }))} className="w-full rounded-2xl border border-slate-200 px-4 py-3" />
            <button type="submit" className="rounded-2xl bg-emerald-600 px-4 py-3 font-semibold text-white">Save Certificate</button>
          </div>
        </form>

        <div className="grid gap-4 md:grid-cols-2">
          {certificates.map((item) => (
            <div key={item.id} className="rounded-[20px] border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">{item.type}</p>
              <h2 className="mt-3 text-lg font-semibold text-slate-900">{item.resident_name}</h2>
              <p className="mt-2 text-sm text-slate-600">Issued on {item.issued_at}</p>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
