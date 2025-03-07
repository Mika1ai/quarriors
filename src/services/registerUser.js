import { supabase } from "./supabase.js";

export async function registerUser(values) {
  const { data, error } = await supabase.auth.signUp({
    email: values.email,
    password: values.password,
    options: {
      data: {
        nickname: values.nickname,
      },
    },
  });

  if (error) {
    console.error("Ошибка при регистрации:", error);
    return;
  }

  console.log("Пользователь зарегистрирован:", data);
}
