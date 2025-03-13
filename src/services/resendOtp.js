import { supabase } from "./supabase.js";

export async function resendOtp(details) {
  const { error: resendingError } = await supabase.auth.resend({
    type: "signup",
    email: details.email,
  });

  return { resendingError };
}
