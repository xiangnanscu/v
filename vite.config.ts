import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueRouter from "unplugin-vue-router/vite";
import Components from "unplugin-vue-components/vite";
import {
  VueRouterAutoImports,
  getPascalCaseRouteName,
} from "unplugin-vue-router";
import AutoImport from 'unplugin-auto-import/vite'

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
      // allowed extensions to be considered as routes
      extensions: [".vue"],
      exclude: [],
      dts: "./src/unplugin/typed-router.d.ts",
      getRouteName: getPascalCaseRouteName,
      routeBlockLang: "json5",
      importMode: "sync",
    }),
    AutoImport({
      //https://github.com/antfu/unplugin-auto-import#configuration
      eslintrc: {
        enabled: true, // Default `false`
        filepath: "./src/unplugin/.eslintrc-auto-import.json", // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
      imports: [
        "vue",
        VueRouterAutoImports,
        { "vue-router/auto": ["useLink"] },
        "@vueuse/core",
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
    vue()],
})
