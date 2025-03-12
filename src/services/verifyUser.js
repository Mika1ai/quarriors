import { supabase } from "./supabase.js";

export async function verifyUser(details) {
  const { data: verificationData, error: verificationError } =
    await supabase.auth.verifyOtp({
      email: details.email,
      token: details.token,
      type: "email",
    });

  if (verificationError) {
    return { verificationData, verificationError };
  }

  await supabase.from("users").insert([
    {
      id: verificationData.user.id,
      nickname: verificationData.user.user_metadata.nickname,
    },
  ]);

  return { verificationData, verificationError };
}
