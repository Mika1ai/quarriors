import { supabase } from "./supabase.js";

export async function signOutUser() {
  const { error: signOutError } = await supabase.auth.signOut();

  return { signOutError };
}
