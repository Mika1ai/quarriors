import { createWebHistory, createRouter } from "vue-router";
import { ROUTES } from "./routes";
import { supabase } from "@/services/supabase";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: ROUTES.SIGNUP.PATH,
      name: ROUTES.SIGNUP.NAME,
      component: () => import(`@/views/${ROUTES.SIGNUP.NAME}.vue`),
      meta: { isAuthPage: true },
    },
    {
      path: ROUTES.CONFIRM_SIGNUP.PATH,
      name: ROUTES.CONFIRM_SIGNUP.NAME,
      component: () => import(`@/views/${ROUTES.CONFIRM_SIGNUP.NAME}.vue`),
      meta: { isAuthPage: true },
    },
    {
      path: ROUTES.SIGNIN.PATH,
      name: ROUTES.SIGNIN.NAME,
      component: () => import(`@/views/${ROUTES.SIGNIN.NAME}.vue`),
      meta: { isAuthPage: true },
    },
    {
      path: ROUTES.HOME.PATH,
      name: ROUTES.HOME.NAME,
      component: () => import(`@/views/${ROUTES.HOME.NAME}.vue`),
      meta: { isAuthPage: false },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { isAuthPage } = to.meta;

  if (!user && !isAuthPage) {
    next({ path: ROUTES.SIGNIN.PATH });
  } else if (user && isAuthPage) {
    next({ path: ROUTES.HOME.PATH });
  } else {
    next();
  }
});

export default router;
