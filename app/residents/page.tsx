"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import SectionHeader from "@/components/ui/SectionHeader";

import ResidentsList from "@/components/residents/ResidentsList";
import AddResidentModal from "@/components/residents/AddResidentModal";
import EditResidentModal from "@/components/residents/EditResidentModal";

import { Resident } from "@/types/resident";

import {
  getResidents,
  addResident,
  updateResident,
  deleteResident,
  uploadResidentPhoto,
} from "@/lib/residents";

export default function ResidentsPage() {
  const [openModal, setOpenModal] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const [selectedResident, setSelectedResident] =
    useState<Resident | null>(null);

  const [residentList, setResidentList] =
    useState<Resident[]>([]);

  async function loadResidents() {
    const data = await getResidents();
    setResidentList(data);
  }

  useEffect(() => {
    loadResidents();
  }, []);

  async function handleAddResident(
    resident: Resident,
    photo: File | null
  ) {
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

  async function handleUpdateResident(
    resident: Resident
  ) {
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
    const confirmDelete = confirm(
      "Are you sure you want to delete this resident?"
    );

    if (!confirmDelete) return;

    await deleteResident(id);

    await loadResidents();
  }

  function handleEditResident(resident: Resident) {
    setSelectedResident(resident);
    setEditOpen(true);
  }

  return (
    <div className="flex">
      <Sidebar />

      <main className="ml-64 flex-1 min-h-screen bg-gray-100">
        <Navbar />

        <div className="p-8">
          <SectionHeader
            title="Residents"
            subtitle="Manage all barangay residents."
          />

          <div className="flex justify-end mb-6">
            <button
              onClick={() => setOpenModal(true)}
              className="bg-black text-white px-5 py-3 rounded-xl hover:bg-gray-800 transition"
            >
              + Add Resident
            </button>
          </div>

          <ResidentsList
            residents={residentList}
            onDelete={handleDeleteResident}
            onEdit={handleEditResident}
          />

          <AddResidentModal
            open={openModal}
            onClose={() => setOpenModal(false)}
            onAdd={handleAddResident}
          />

          <EditResidentModal
            open={editOpen}
            resident={selectedResident}
            onClose={() => {
              setEditOpen(false);
              setSelectedResident(null);
            }}
            onSave={handleUpdateResident}
          />
        </div>
      </main>
    </div>
  );
}