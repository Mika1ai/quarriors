import { watch } from "vue";
import { createWebHashHistory, createRouter } from "vue-router";
import { ROUTES } from "./routes";
import { useUserStore } from "@/stores";

const router = createRouter({
  history: createWebHashHistory("/quarriors/"),
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
  const userStore = useUserStore();

  if (userStore.isLoading) {
    await new Promise((resolve) => {
      const stop = watch(
        () => userStore.isLoading,
        (loading) => {
          if (!loading) {
            stop();
            resolve();
          }
        },
        { immediate: true },
      );
    });
  }

  const isAuthPage = to.meta.isAuthPage;
  const { isAuthenticated } = userStore;

  if (isAuthenticated && isAuthPage) {
    next({ path: ROUTES.HOME.PATH });
  } else if (!isAuthenticated && !isAuthPage) {
    next({ path: ROUTES.SIGN_IN.PATH });
  } else {
    next();
  }

  watch(
    () => userStore.isAuthenticated,
    () => {
      const isAuthPage = to.meta.isAuthPage;
      const { isAuthenticated } = userStore;

      if (isAuthenticated && isAuthPage) {
        router.push({ path: ROUTES.HOME.PATH });
      } else if (!isAuthenticated && !isAuthPage) {
        router.push({ path: ROUTES.SIGN_IN.PATH });
      }
    },
  );
});

export { router, ROUTES };
