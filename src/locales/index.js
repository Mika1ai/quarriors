import { createI18n } from "vue-i18n";
import en from "./en.json";
import ru from "./ru.json";

export const i18n = createI18n({
  locale: "en",
  messages: {
    en: en,
    ru: ru,
  },
});
