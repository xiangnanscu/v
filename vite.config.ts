import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueRouter from "unplugin-vue-router/vite";
import Components from "unplugin-vue-components/vite";
import {
  VueRouterAutoImports,
  getPascalCaseRouteName,
} from "unplugin-vue-router";
import AutoImport from 'unplugin-auto-import/vite'
import Pages from "vite-plugin-pages";
import Layouts from "vite-plugin-vue-layouts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Components({
      dirs: ["./src/components"],
      extensions: ["vue"],
      dts: "./src/unplugin/components.d.ts",
      resolvers: [],
    }),
    VueRouter({
      routesFolder: ["./src/views"],
      extensions: [".vue"],
      exclude: [],
      dts: "./src/unplugin/typed-router.d.ts",
      getRouteName: getPascalCaseRouteName,
      routeBlockLang: "json5",
      importMode: "async",
    }),
    AutoImport({
      eslintrc: {
        enabled: true,
        filepath: "./src/unplugin/.eslintrc-auto-import.json",
        globalsPropValue: true,
      },
      imports: [
        "vue",
        VueRouterAutoImports,
        { "vue-router/auto": ["useLink"] },
      ],
      dts: "./src/unplugin/auto-imports.d.ts",
      vueTemplate: true,
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
      ],
      dirs: [
        "./src/components", // only root modules
        "./src/composables", // only root modules
        "./src/store/**", // all nested modules
      ],
    }),
    vue(),
    Pages(),
    Layouts({ layoutsDirs: "src/layouts", defaultLayout: 'default' }),],
})
