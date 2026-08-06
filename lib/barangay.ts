import { supabase } from "./supabase";

export type HouseholdRecord = {
  id: number;
  household_number: string;
  family_head: string;
  members: number;
  address: string;
};

export type CertificateRecord = {
  id: number;
  type: string;
  resident_name: string;
  issued_at: string;
};

export type BlotterRecord = {
  id: number;
  case_number: string;
  complainant: string;
  category: string;
  status: string;
};

export type AnnouncementRecord = {
  id: number;
  title: string;
  date: string;
  pinned: boolean;
};

export async function getHouseholds() {
  const { data, error } = await supabase.from("households").select("*").order("id", { ascending: true });
  if (error) {
    console.error(error);
    return [] as HouseholdRecord[];
  }
  return (data ?? []) as HouseholdRecord[];
}

export async function addHousehold(household: Omit<HouseholdRecord, "id">) {
  const { data, error } = await supabase.from("households").insert([household]).select();
  if (error) {
    console.error(error);
    return null;
  }
  return (data ?? [])[0] as HouseholdRecord | null;
}

export async function getCertificates() {
  const { data, error } = await supabase.from("certificates").select("*").order("id", { ascending: true });
  if (error) {
    console.error(error);
    return [] as CertificateRecord[];
  }
  return (data ?? []) as CertificateRecord[];
}

export async function addCertificate(certificate: Omit<CertificateRecord, "id">) {
  const { data, error } = await supabase.from("certificates").insert([certificate]).select();
  if (error) {
    console.error(error);
    return null;
  }
  return (data ?? [])[0] as CertificateRecord | null;
}

export async function getBlotters() {
  const { data, error } = await supabase.from("blotters").select("*").order("id", { ascending: true });
  if (error) {
    console.error(error);
    return [] as BlotterRecord[];
  }
  return (data ?? []) as BlotterRecord[];
}

export async function addBlotter(blotter: Omit<BlotterRecord, "id">) {
  const { data, error } = await supabase.from("blotters").insert([blotter]).select();
  if (error) {
    console.error(error);
    return null;
  }
  return (data ?? [])[0] as BlotterRecord | null;
}

export async function getAnnouncements() {
  const { data, error } = await supabase.from("announcements").select("*").order("id", { ascending: true });
  if (error) {
    console.error(error);
    return [] as AnnouncementRecord[];
  }
  return (data ?? []) as AnnouncementRecord[];
}

export async function addAnnouncement(announcement: Omit<AnnouncementRecord, "id">) {
  const { data, error } = await supabase.from("announcements").insert([announcement]).select();
  if (error) {
    console.error(error);
    return null;
  }
  return (data ?? [])[0] as AnnouncementRecord | null;
}
