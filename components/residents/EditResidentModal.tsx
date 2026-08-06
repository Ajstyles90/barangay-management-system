"use client";

import { useEffect, useState } from "react";
import { Resident } from "@/types/resident";

interface EditResidentModalProps {
  open: boolean;
  resident: Resident | null;
  onClose: () => void;
  onSave: (resident: Resident) => void;
}

export default function EditResidentModal({
  open,
  resident,
  onClose,
  onSave,
}: EditResidentModalProps) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [purok, setPurok] = useState("Purok 1");
  const [status, setStatus] = useState("Active");

  useEffect(() => {
    if (resident) {
      setName(resident.name);
      setAge(String(resident.age));
      setPurok(resident.purok);
      setStatus(resident.status);
    }
  }, [resident]);

  if (!open || !resident) return null;

  const currentResident = resident;

  function handleSave() {
    if (!name.trim() || !age) {
      alert("Please complete all required fields.");
      return;
    }

    const updatedResident: Resident = {
      id: currentResident.id,
      name: name.trim(),
      age: Number(age),
      purok,
      status,
      photo_url: currentResident.photo_url,
    };

    onSave(updatedResident);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 py-8 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-[28px] border border-white/70 bg-white/95 p-6 shadow-[0_30px_90px_-30px_rgba(2,6,23,0.85)]">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">Resident profile</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">Edit Resident</h2>
          </div>
          <button type="button" onClick={onClose} className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900" aria-label="Close dialog">✕</button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm font-medium text-slate-700">
            Full Name
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100" />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700">
            Age
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100" />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700">
            Purok
            <select value={purok} onChange={(e) => setPurok(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100">
              <option value="Purok 1">Purok 1</option>
              <option value="Purok 2">Purok 2</option>
              <option value="Purok 3">Purok 3</option>
              <option value="Purok 4">Purok 4</option>
            </select>
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700">
            Status
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100">
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </label>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button type="button" onClick={onClose} className="rounded-2xl border border-slate-200 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-100">Cancel</button>
          <button type="button" onClick={handleSave} className="rounded-2xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-700">Save Changes</button>
        </div>
      </div>
    </div>
  );
}