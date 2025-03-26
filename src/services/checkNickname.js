import { supabase } from "./supabase.js";
import { toast } from "vue3-toastify";
import { i18n } from "@/locales";

export async function checkNickname(nickname) {
  try {
    const { data, error } = await supabase.rpc("check_nickname", {
      nickname_to_check: nickname,
    });

    console.log(data, error);

    if (error) throw error;
    if (!data) throw data;

    return data;
  } catch (error) {
    const errorMessage = error ? error.code : "nickname_taken";
    toast(i18n.global.t(`errors.${errorMessage}`), { type: toast.TYPE.ERROR });

    return null;
  }
}
