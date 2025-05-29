"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function logout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function login(formData: { email: string; password: string }) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  return { success: true, user: data.user };
}

// signup

export async function signup(formData: {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
}) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        firstname: formData.firstname,
        lastname: formData.lastname,
        isNewUser: true,
        name: `${formData.firstname} ${formData.lastname}`,
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true, user: data.user };
}

// update user
export async function updateUser(formData: {
  firstname: string;
  lastname: string;
}) {
  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    data: {
      firstname: formData.firstname,
      lastname: formData.lastname,
      name: `${formData.firstname} ${formData.lastname}`,
    },
  });

  if (error) {
    return { error: error.message };
  }
  revalidatePath("/", "layout");
  return { success: true };
}

export async function addProfile(formData: {
  user_id: string;
  age: number;
  height: number;
  height_unit: string;
  weight: number;
  weight_unit: string;
}) {
  const supabase = await createClient();

  const { error } = await supabase.from("profiles").upsert(
    {
      user_id: formData.user_id,
      age: formData.age,
      height: formData.height,
      height_unit: formData.height_unit,
      weight: formData.weight,
      weight_unit: formData.weight_unit,
    },
    { onConflict: "user_id" }
  );

  if (error) {
    return { error: error.message };
  }
  revalidatePath("/", "layout");
  return { success: true };
}

export async function updateProfile(formData: {
  user_id: string;
  age?: number;
  height: number;
  height_unit: string;
  weight: number;
  weight_unit: string;
}) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("profiles")
    .update({
      age: formData.age,
      height: formData.height,
      height_unit: formData.height_unit,
      weight: formData.weight,
      weight_unit: formData.weight_unit,
    })
    .eq("user_id", formData.user_id);

  if (error) {
    return { error: error.message };
  }
  revalidatePath("/", "layout");
  return { success: true };
}
export async function getProfile(userId: string | undefined) {
  if (!userId) {
    console.error("No user ID provided");
    return null;
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
  return data;
}
