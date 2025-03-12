import { supabase } from "./supabase.js";

export async function registerUser(details) {
  const { data: registrationData, error: registrationError } =
    await supabase.auth.signUp({
      email: details.email,
      password: details.password,
      options: {
        data: {
          nickname: details.nickname,
        },
      },
    });

  return { registrationData, registrationError };
}
