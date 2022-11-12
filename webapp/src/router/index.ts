import { route } from "quasar/wrappers";
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "src/stores/auth.store";

import routes from "./routes";

export default route(function (/* { store, ssrContext } */) {
    const createHistory = createWebHistory;
    const authStore = useAuthStore();

    const router = createRouter({
        scrollBehavior: () => ({ left: 0, top: 0 }),
        routes,

        // Leave this as is and make changes in quasar.conf.js instead!
        // quasar.conf.js -> build -> vueRouterMode
        // quasar.conf.js -> build -> publicPath
        history: createHistory(process.env.VUE_ROUTER_BASE),
    });
    router.beforeEach(async (to, from, next) => {
        // User is not logged.
        if (authStore.isLogged === false) {
            // Landing page?
            if (to.name === "landing") {
                return next({ name: "auth.signIn" });
            }

            // User wants to access a "authenticated" page, redirect user to sign-in if he is not logged
            if (to.matched.some(record => record.meta.requireAuth)) {
                return next({
                    name: "auth.signIn",
                    query: { redirect: to.fullPath },
                });
            }
        }

        // User is logged.
        if (authStore.isLogged === true) {
            // Landing page?
            if (to.name === "landing") {
                return next({ name: "main" });
            }

            // Has a redirect? (to manage deep links).
            if (to.query?.redirect !== undefined) {
                return next({ path: to.query?.redirect as string });
            }
        }
        return next();
    });
    return router;
});
