import { supabase } from "./supabase.js";

export async function isNicknameAvailable(nickname) {
  const { data: isAvailable, error } = await supabase.rpc(
    "is_nickname_available",
    { nickname_to_check: nickname },
  );

  return isAvailable;
}
