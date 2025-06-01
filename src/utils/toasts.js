import { toast } from "vue3-toastify";
import { i18n } from "@/locales";

export const createLoadingToast = () => {
  return toast(i18n.global.t("common.loading"), { autoClose: false });
};

export const updateLoadingToast = ({ target, message, success }) => {
  toast.update(target, {
    type: success ? toast.TYPE.SUCCESS : toast.TYPE.ERROR,
    render: i18n.global.t(`${message}`),
    autoClose: 1000,
  });
};
