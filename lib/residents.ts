import { supabase } from "./supabase";

export async function getResidents() {
  const { data, error } = await supabase
    .from("residents")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error(error);
    return [];
  }

  return data.map((resident) => ({
    id: resident.id,
    name: resident.full_name,
    age: resident.age,
    purok: resident.purok,
    status: resident.status,
    photo_url: resident.photo_url ?? null,
  }));
}

export async function uploadResidentPhoto(file: File) {
  console.log("========== START UPLOAD ==========");
  console.log("Selected file:", file);

  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;

  console.log("Uploading as:", fileName);

  const { data, error } = await supabase.storage
    .from("resident-photos")
    .upload(fileName, file);

  console.log("Upload Response:", data);
  console.log("Upload Error:", error);

  if (error) {
    alert(error.message);
    console.error(error);
    return null;
  }

  const { data: publicUrlData } = supabase.storage
    .from("resident-photos")
    .getPublicUrl(fileName);

  console.log("Public URL:", publicUrlData.publicUrl);
  console.log("========== END UPLOAD ==========");

  return publicUrlData.publicUrl;
}

export async function addResident(resident: {
  name: string;
  age: number;
  purok: string;
  status: string;
  photo_url?: string | null;
}) {
  console.log("Saving resident:", resident);

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
    console.error(error);
    return null;
  }

  return data;
}

export async function updateResident(resident: {
  id: number;
  name: string;
  age: number;
  purok: string;
  status: string;
  photo_url?: string | null;
}) {
  console.log("Updating resident:", resident);

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
    console.error(error);
    return null;
  }

  return data;
}

export async function deleteResident(id: number) {
  const { error } = await supabase
    .from("residents")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
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