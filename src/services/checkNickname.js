import { supabase } from "./supabase.js";

export async function checkNickname(nickname) {
  const { data: isAvailable } = await supabase.rpc("check_nickname", {
    nickname_to_check: nickname,
  });

  return isAvailable;
}
