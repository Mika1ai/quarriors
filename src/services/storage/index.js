import { supabase } from "@/services/supabaseClient";
import { createLoadingToast, updateLoadingToast } from "@/utils";

export const storage = {
  uploadFile: async ({ bucket, path, file }) => {
    const notification = createLoadingToast();

    try {
      const { error } = await supabase.storage.from(bucket).upload(path, file, {
        contentType: file.type,
        upsert: true,
      });

      if (error) throw error.code;

      const { data } = await supabase.storage.from(bucket).getPublicUrl(path);

      updateLoadingToast({
        target: notification,
        message: "common.success",
        success: true,
      });

      return data.publicUrl;
    } catch (error) {
      updateLoadingToast({
        target: notification,
        message: `errors.${error}`,
        success: false,
      });

      return false;
    }
  },
  deleteFile: async ({ bucket, path }) => {
    const notification = createLoadingToast();

    try {
      const { error } = await supabase.storage.from(bucket).remove([path]);

      if (error) throw error.code;

      updateLoadingToast({
        target: notification,
        message: "common.success",
        success: true,
      });

      return true;
    } catch (error) {
      updateLoadingToast({
        target: notification,
        message: `errors.${error}`,
        success: false,
      });

      return false;
    }
  },
};
