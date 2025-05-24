import { createWebHistory, createRouter } from "vue-router";
import { ROUTES } from "./routes";
import { supabase } from "@/services/supabaseClient";
import { useUserStore } from "../stores";

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
  const { data } = await supabase.auth.getUser();

  const user = data?.user;
  const userStore = useUserStore();
  const isAuthPage = to.meta.isAuthPage;

  if (!user) {
    userStore.clearUser();
    return isAuthPage ? next() : next({ path: ROUTES.SIGN_IN.PATH });
  }

  userStore.setUser({
    id: user.id,
    email: user.email,
    nickname: user.user_metadata.nickname,
  });

  return isAuthPage ? next({ path: ROUTES.HOME.PATH }) : next();
});

export { router, ROUTES };
