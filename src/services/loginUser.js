import { supabase } from "./supabase.js";

export async function loginUser(details) {
  const { data: loginData, error: loginError } =
    await supabase.auth.signInWithPassword({
      email: details.email,
      password: details.password,
    });

  return { loginData, loginError };
}
