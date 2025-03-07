import { createMemoryHistory, createRouter } from "vue-router";
import { ROUTES } from "./routes";

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: "/",
      redirect: ROUTES.SIGNUP.PATH,
    },
    {
      path: ROUTES.SIGNUP.PATH,
      name: ROUTES.SIGNUP.NAME,
      component: () => import(`@/views/${ROUTES.SIGNUP.NAME}.vue`),
      meta: { keepAlive: true, isAuthPage: true },
    },
  ],
});

export default router;
