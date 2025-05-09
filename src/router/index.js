import { createWebHistory, createRouter } from "vue-router";
import { ROUTES } from "./routes";
import { supabase } from "@/services/supabaseClient";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: ROUTES.SIGN_UP.PATH,
      name: ROUTES.SIGN_UP.NAME,
      component: () => import(`@/views/${ROUTES.SIGN_UP.NAME}.vue`),
      meta: { isAuthPage: true, layout: "auth" },
    },
    {
      path: ROUTES.SIGN_UP_CONFIRM.PATH,
      name: ROUTES.SIGN_UP_CONFIRM.NAME,
      component: () => import(`@/views/${ROUTES.SIGN_UP_CONFIRM.NAME}.vue`),
      meta: { isAuthPage: true, layout: "auth" },
    },
    {
      path: ROUTES.SIGN_IN.PATH,
      name: ROUTES.SIGN_IN.NAME,
      component: () => import(`@/views/${ROUTES.SIGN_IN.NAME}.vue`),
      meta: { isAuthPage: true, layout: "auth" },
    },
    {
      path: ROUTES.RESET_PASSWORD.PATH,
      name: ROUTES.RESET_PASSWORD.NAME,
      component: () => import(`@/views/${ROUTES.RESET_PASSWORD.NAME}.vue`),
      meta: { isAuthPage: true, layout: "auth" },
    },
    {
      path: ROUTES.UPDATE_PASSWORD.PATH,
      name: ROUTES.UPDATE_PASSWORD.NAME,
      component: () => import(`@/views/${ROUTES.UPDATE_PASSWORD.NAME}.vue`),
      meta: { isAuthPage: false, layout: "auth" },
    },
    {
      path: ROUTES.HOME.PATH,
      name: ROUTES.HOME.NAME,
      component: () => import(`@/views/${ROUTES.HOME.NAME}.vue`),
      meta: { isAuthPage: false, layout: "default" },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { isAuthPage } = to.meta;

  if (!user && !isAuthPage) {
    next({ path: ROUTES.SIGN_IN.PATH });
  } else if (user && isAuthPage) {
    next({ path: ROUTES.HOME.PATH });
  } else {
    next();
  }
});

export { router, ROUTES };
