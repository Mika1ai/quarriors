// https://vite.dev/config/
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import Components from "unplugin-vue-components/vite";

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    Components({
      dirs: ["src/components"],
      directoryAsNamespace: true,
      globalNamespaces: [""],
      extensions: ["vue"],
      deep: true,
      dts: true,
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/styles/utilities/variables" as *;
          @use "@/styles/utilities/mixins" as *;
        `,
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
