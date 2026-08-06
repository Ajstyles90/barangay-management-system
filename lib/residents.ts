import { Resident } from "@/types/resident";
import { supabase } from "./supabase";

function mapResident(row: {
  id: number;
  full_name?: string | null;
  age?: number | null;
  purok?: string | null;
  status?: string | null;
  photo_url?: string | null;
}): Resident {
  return {
    id: row.id,
    name: row.full_name ?? "Unnamed Resident",
    age: Number(row.age ?? 0),
    purok: row.purok ?? "Unknown",
    status: row.status ?? "Active",
    photo_url: row.photo_url ?? null,
  };
}

export async function getResidents() {
  const { data, error } = await supabase
    .from("residents")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Failed to load residents", error);
    return [] as Resident[];
  }

  return (data ?? []).map(mapResident);
}

export async function uploadResidentPhoto(file: File) {
  const fileExt = file.name.split(".").pop() ?? "jpg";
  const fileName = `${Date.now()}.${fileExt}`;

  const { data, error } = await supabase.storage.from("resident-photos").upload(fileName, file);

  if (error) {
    console.error("Photo upload failed", error);
    return null;
  }

  const { data: publicUrlData } = supabase.storage.from("resident-photos").getPublicUrl(fileName);
  return publicUrlData.publicUrl;
}

export async function addResident(resident: {
  name: string;
  age: number;
  purok: string;
  status: string;
  photo_url?: string | null;
}) {
  const { data, error } = await supabase
    .from("residents")
    .insert([
      {
        full_name: resident.name,
        age: resident.age,
        purok: resident.purok,
        status: resident.status,
        photo_url: resident.photo_url ?? null,
      },
    ])
    .select();

  if (error) {
    console.error("Failed to add resident", error);
    return null;
  }

  return (data ?? []).map(mapResident);
}

export async function updateResident(resident: {
  id: number;
  name: string;
  age: number;
  purok: string;
  status: string;
  photo_url?: string | null;
}) {
  const { data, error } = await supabase
    .from("residents")
    .update({
      full_name: resident.name,
      age: resident.age,
      purok: resident.purok,
      status: resident.status,
      photo_url: resident.photo_url ?? null,
    })
    .eq("id", resident.id)
    .select();

  if (error) {
    console.error("Failed to update resident", error);
    return null;
  }

  return (data ?? []).map(mapResident);
}

export async function deleteResident(id: number) {
  const { error } = await supabase.from("residents").delete().eq("id", id);

  if (error) {
    console.error("Failed to delete resident", error);
    return false;
  }

  return true;
}

export async function getDashboardStats() {
  const { count: residentCount } = await supabase
    .from("residents")
    .select("*", { count: "exact", head: true });

  const { count: activeCount } = await supabase
    .from("residents")
    .select("*", { count: "exact", head: true })
    .eq("status", "Active");

  const { count: inactiveCount } = await supabase
    .from("residents")
    .select("*", { count: "exact", head: true })
    .eq("status", "Inactive");

  return {
    residentCount: residentCount ?? 0,
    activeCount: activeCount ?? 0,
    inactiveCount: inactiveCount ?? 0,
  };
}