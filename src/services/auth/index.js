import { supabase } from "@/services/supabaseClient";
import { toast } from "vue3-toastify";
import { i18n } from "@/locales";
import { DOMAIN } from "@/config";
import { useUserStore } from "@/stores";
import { router, ROUTES } from "@/router";

const userStore = useUserStore();

export const auth = {
  signUp: async (credentials) => {
    const notification = toast(i18n.global.t("common.loading"));

    try {
      const { error } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
        options: {
          data: {
            nickname: credentials.nickname,
          },
        },
      });

      if (error) throw error.code;

      toast.update(notification, {
        type: toast.TYPE.SUCCESS,
        render: i18n.global.t("common.success"),
      });

      router.push({
        path: ROUTES.SIGN_UP_CONFIRM.PATH,
        query: { email: credentials.email },
      });
    } catch (error) {
      toast.update(notification, {
        type: toast.TYPE.ERROR,
        render: i18n.global.t(`errors.${error}`),
      });
    }
  },
  resendOtp: async (credentials) => {
    const notification = toast(i18n.global.t("common.loading"));

    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: credentials.email,
      });

      if (error) throw error.code;

      toast.update(notification, {
        type: toast.TYPE.SUCCESS,
        render: i18n.global.t("common.success"),
      });
    } catch (error) {
      toast.update(notification, {
        type: toast.TYPE.ERROR,
        render: i18n.global.t(`errors.${error}`),
      });
    }
  },
  verifyEmail: async (credentials) => {
    const notification = toast(i18n.global.t("common.loading"));

    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.verifyOtp({
        email: credentials.email,
        token: credentials.token,
        type: "email",
      });

      if (error) throw error.code;

      toast.update(notification, {
        type: toast.TYPE.SUCCESS,
        render: i18n.global.t("common.success"),
      });

      userStore.setUser({
        id: user.id,
        email: user.email,
        nickname: user.user_metadata.nickname,
        isAuthenticated: user.role === "authenticated",
      });
    } catch (error) {
      toast.update(notification, {
        type: toast.TYPE.ERROR,
        render: i18n.global.t(`errors.${error}`),
      });
    }
  },
  resetPassword: async (credentials) => {
    const notification = toast(i18n.global.t("common.loading"));

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        credentials.email,
        { redirectTo: `${DOMAIN}${ROUTES.UPDATE_PASSWORD.PATH}` },
      );

      if (error) throw error.code;

      toast.update(notification, {
        type: toast.TYPE.SUCCESS,
        render: i18n.global.t("common.success"),
      });
    } catch (error) {
      toast.update(notification, {
        type: toast.TYPE.ERROR,
        render: i18n.global.t(`errors.${error}`),
      });
    }
  },
  signIn: async (credentials) => {
    const notification = toast(i18n.global.t("common.loading"));

    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) throw error.code;

      toast.update(notification, {
        type: toast.TYPE.SUCCESS,
        render: i18n.global.t("common.success"),
      });

      userStore.setUser({
        id: user.id,
        email: user.email,
        nickname: user.user_metadata.nickname,
        isAuthenticated: user.role === "authenticated",
      });
    } catch (error) {
      toast.update(notification, {
        type: toast.TYPE.ERROR,
        render: i18n.global.t(`errors.${error}`),
      });
    }
  },
  signOut: async () => {
    const notification = toast(i18n.global.t("common.loading"));

    try {
      const { error } = await supabase.auth.signOut();

      if (error) throw error.code;

      toast.update(notification, {
        type: toast.TYPE.SUCCESS,
        render: i18n.global.t("common.success"),
      });

      userStore.clearUser();
    } catch (error) {
      toast.update(notification, {
        type: toast.TYPE.ERROR,
        render: i18n.global.t(`errors.${error}`),
      });
    }
  },
};
