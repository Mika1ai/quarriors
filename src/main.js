import App from "./App.vue";
import { createApp } from "vue";
import { i18n } from "./locales";
import router from "./router";
import Vue3Toastify, { toast } from "vue3-toastify";
import InlineSvg from "vue-inline-svg";

import "./styles/main.scss";
import "vue3-toastify/dist/index.css";

const app = createApp(App);
app.use(router);
app.use(i18n);
app.use(Vue3Toastify, {
  autoClose: false,
  position: toast.POSITION.BOTTOM_CENTER,
});
app.component("InlineSvg", InlineSvg);
app.mount("#app");
