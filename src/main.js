import App from "./App.vue";
import { createApp } from "vue";
import { i18n } from "./locales";
import router from "./router";
import Vue3Toastify from "vue3-toastify";

import "./styles/main.scss";
import "vue3-toastify/dist/index.css";

const app = createApp(App);
app.use(router);
app.use(i18n);
app.use(Vue3Toastify, { autoClose: 3000 });
app.mount("#app");
