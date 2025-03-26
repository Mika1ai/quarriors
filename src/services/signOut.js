import { supabase } from "./supabase.js";
import { toast } from "vue3-toastify";
import { i18n } from "@/locales";

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;

    return true;
  } catch (error) {
    toast(i18n.global.t(`errors.${error.code}`), { type: toast.TYPE.ERROR });

    return null;
  }
}
