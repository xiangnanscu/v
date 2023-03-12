import { createRouter, createWebHashHistory } from "vue-router/auto";
// import { routes } from "vue-router/auto/routes";
import { setupLayouts } from "virtual:generated-layouts";


const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  extendRoutes: (routes) => {
    setupLayouts(routes)
    return routes
  },
});
export default router;