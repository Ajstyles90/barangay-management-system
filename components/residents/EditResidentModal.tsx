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

  function handleSave() {
    if (!name.trim() || !age) {
      alert("Please complete all fields.");
      return;
    }

    const updatedResident: Resident = {
      id: resident.id,
      name: name,
      age: Number(age),
      purok: purok,
      status: status,
      photo_url: resident.photo_url,
    };

    onSave(updatedResident);
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-black">
            Edit Resident
          </h2>

          <button
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-black"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            className="w-full p-3 border rounded-lg bg-white text-black"
          />

          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Age"
            className="w-full p-3 border rounded-lg bg-white text-black"
          />

          <select
            value={purok}
            onChange={(e) => setPurok(e.target.value)}
            className="w-full p-3 border rounded-lg bg-white text-black"
          >
            <option value="Purok 1">Purok 1</option>
            <option value="Purok 2">Purok 2</option>
            <option value="Purok 3">Purok 3</option>
            <option value="Purok 4">Purok 4</option>
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-3 border rounded-lg bg-white text-black"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
            >
              Save Changes
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}