"use client";

import { useEffect, useState } from "react";
import { Resident } from "@/types/resident";

interface AddResidentModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (resident: Resident, photo: File | null) => void;
}

export default function AddResidentModal({
  open,
  onClose,
  onAdd,
}: AddResidentModalProps) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [purok, setPurok] = useState("Purok 1");
  const [status, setStatus] = useState("Active");
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!open) {
      resetForm();
    }
  }, [open]);

  if (!open) return null;

  function resetForm() {
    setName("");
    setAge("");
    setPurok("Purok 1");
    setStatus("Active");
    setPhoto(null);
    setPreview("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim() || !age) {
      alert("Please complete all required fields.");
      return;
    }

    onAdd(
      {
        id: Date.now(),
        name: name.trim(),
        age: Number(age),
        purok,
        status,
        photo_url: null,
      },
      photo
    );

    resetForm();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 py-8 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-[28px] border border-white/70 bg-white/95 p-6 shadow-[0_30px_90px_-30px_rgba(2,6,23,0.85)]">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">Resident profile</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">Add New Resident</h2>
          </div>
          <button
            type="button"
            onClick={() => {
              resetForm();
              onClose();
            }}
            className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col items-center rounded-[24px] border border-slate-200 bg-slate-50 p-5">
            {preview ? (
              <img src={preview} alt="Resident preview" className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-md" />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-200 text-4xl text-slate-600">👤</div>
            )}
            <input
              type="file"
              accept="image/*"
              className="mt-4 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setPhoto(file);
                setPreview(URL.createObjectURL(file));
              }}
            />
            <p className="mt-2 text-xs text-slate-500">Photo is optional</p>
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
                <option>Purok 1</option>
                <option>Purok 2</option>
                <option>Purok 3</option>
                <option>Purok 4</option>
              </select>
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-700">
              Status
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100">
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </label>
          </div>

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <button type="button" onClick={() => { resetForm(); onClose(); }} className="rounded-2xl border border-slate-200 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-100">Cancel</button>
            <button type="submit" className="rounded-2xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-700">Save Resident</button>
          </div>
        </form>
      </div>
    </div>
  );
}