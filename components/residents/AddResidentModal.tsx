"use client";

import { useState } from "react";
import { Resident } from "@/types/resident";

interface AddResidentModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (
    resident: Resident,
    photo: File | null
  ) => void;
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
        name,
        age: Number(age),
        purok,
        status,
      },
      photo
    );

    resetForm();
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-black">
            Add Resident
          </h2>

          <button
            onClick={() => {
              resetForm();
              onClose();
            }}
            className="text-2xl text-gray-500 hover:text-black"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Photo Preview */}

          <div className="flex flex-col items-center">

            {preview ? (
              <img
                src={preview}
                alt="Resident Preview"
                className="w-28 h-28 rounded-full object-cover border-4 border-gray-300"
              />
            ) : (
              <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center text-5xl">
                👤
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              className="mt-4 w-full text-black"
              onChange={(e) => {
                const file = e.target.files?.[0];

                if (!file) return;

                setPhoto(file);
                setPreview(URL.createObjectURL(file));
              }}
            />

            <p className="text-xs text-gray-500 mt-2">
              Photo is optional
            </p>

          </div>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded-lg bg-white text-black"
          />

          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full p-3 border rounded-lg bg-white text-black"
          />

          <select
            value={purok}
            onChange={(e) => setPurok(e.target.value)}
            className="w-full p-3 border rounded-lg bg-white text-black"
          >
            <option>Purok 1</option>
            <option>Purok 2</option>
            <option>Purok 3</option>
            <option>Purok 4</option>
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-3 border rounded-lg bg-white text-black"
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>

          <div className="flex justify-end gap-3 pt-2">

            <button
              type="button"
              onClick={() => {
                resetForm();
                onClose();
              }}
              className="px-5 py-2 border rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
            >
              Save Resident
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}