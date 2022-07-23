import { route } from "quasar/wrappers";
import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";

export default route(function (/* { store, ssrContext } */) {
    const createHistory = createWebHistory;

    const Router = createRouter({
        scrollBehavior: () => ({ left: 0, top: 0 }),
        routes,

        history: createHistory(process.env.VUE_ROUTER_BASE),
    });

    Router.beforeEach(async (to, from, next) => {
        next();
    });

    return Router;
});
