import { createApp } from "vue";
import { i18n } from "./locales";
import router from "./router";
import App from "./App.vue";
import "./styles/main.scss";

const app = createApp(App);
app.use(router);
app.use(i18n);
app.mount("#app");
