import { createApp } from "vue";
import { createPinia } from "pinia";
import { i18n } from "@/locales";
import { router } from "@/router";
import Vue3Toastify, { toast } from "vue3-toastify";
import App from "@/App.vue";
import InlineSvg from "vue-inline-svg";

import "./styles/main.scss";
import "vue3-toastify/dist/index.css";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(i18n);
app.use(Vue3Toastify, {
  position: toast.POSITION.BOTTOM_CENTER,
});

app.component("InlineSvg", InlineSvg);

app.mount("#app");
