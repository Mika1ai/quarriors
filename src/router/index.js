import { createWebHistory, createRouter } from "vue-router";
import { ROUTES } from "./routes";

const router = createRouter({
  history: createWebHistory(),
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
    {
      path: ROUTES.SIGNIN.PATH,
      name: ROUTES.SIGNIN.NAME,
      component: () => import(`@/views/${ROUTES.SIGNIN.NAME}.vue`),
      meta: { keepAlive: true, isAuthPage: true },
    },
  ],
});

export default router;
