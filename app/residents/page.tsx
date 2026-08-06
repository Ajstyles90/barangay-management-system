"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import ResidentsList from "@/components/residents/ResidentsList";
import AddResidentModal from "@/components/residents/AddResidentModal";
import EditResidentModal from "@/components/residents/EditResidentModal";
import { Resident } from "@/types/resident";
import { getResidents, addResident, updateResident, deleteResident, uploadResidentPhoto } from "@/lib/residents";

export default function ResidentsPage() {
  const [openModal, setOpenModal] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedResident, setSelectedResident] = useState<Resident | null>(null);
  const [residentList, setResidentList] = useState<Resident[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function loadResidents() {
    setIsLoading(true);
    const data = await getResidents();
    setResidentList(data);
    setIsLoading(false);
  }

  useEffect(() => {
    loadResidents();
  }, []);

  async function handleAddResident(resident: Resident, photo: File | null) {
    let photoUrl: string | null = null;

    if (photo) {
      photoUrl = await uploadResidentPhoto(photo);
    }

    await addResident({
      name: resident.name,
      age: resident.age,
      purok: resident.purok,
      status: resident.status,
      photo_url: photoUrl,
    });

    await loadResidents();
    setOpenModal(false);
  }

  async function handleUpdateResident(resident: Resident) {
    await updateResident({
      id: resident.id,
      name: resident.name,
      age: resident.age,
      purok: resident.purok,
      status: resident.status,
      photo_url: resident.photo_url ?? null,
    });

    await loadResidents();
    setEditOpen(false);
    setSelectedResident(null);
  }

  async function handleDeleteResident(id: number) {
    const confirmDelete = confirm("Are you sure you want to delete this resident?");

    if (!confirmDelete) return;

    await deleteResident(id);
    await loadResidents();
  }

  function handleEditResident(resident: Resident) {
    setSelectedResident(resident);
    setEditOpen(true);
  }

  return (
    <PageShell title="Residents" subtitle="Manage all barangay residents from a polished, secure workspace." action={<button onClick={() => setOpenModal(true)} className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"><Plus size={16} /> Add Resident</button>}>
      <div className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
        {isLoading ? "Connecting to Supabase live database..." : `Connected to Supabase and loaded ${residentList.length} resident record(s).`}
      </div>
      <ResidentsList residents={residentList} onDelete={handleDeleteResident} onEdit={handleEditResident} />

      <AddResidentModal open={openModal} onClose={() => setOpenModal(false)} onAdd={handleAddResident} />

      <EditResidentModal open={editOpen} resident={selectedResident} onClose={() => { setEditOpen(false); setSelectedResident(null); }} onSave={handleUpdateResident} />
    </PageShell>
  );
}