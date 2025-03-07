import { supabase } from "./supabase.js";

export async function verifyUser(values) {
  const { data, error } = await supabase.auth.verifyOtp({
    email: "baranau.mikalai@gmail.com",
    token: values.token,
    type: "email",
  });

  console.log(data, error);

  await supabase
    .from("users")
    .insert([{ id: data.user.id, nickname: data.user.user_metadata.nickname }]);

  console.log("!!!");
}
