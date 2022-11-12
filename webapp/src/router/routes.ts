import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "landing",
        component: () => import("layouts/LandingLayout.vue"),
        meta: { requireAuth: false },
        children: [
            {
                name: "auth.signIn",
                path: "sign-in",
                component: () => import("src/components/AuthSignIn.vue"),
            },
        ],
    },
    {
        path: "/",
        name: "main",
        component: () => import("src/layouts/MainLayout.vue"),
        meta: { requireAuth: true },
        children: [
            {
                name: "account.dashboard",
                path: "account/dashboard",
                component: () => import("src/pages/AccountDashboardPage.vue"),
            },
        ],
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: "/:catchAll(.*)*",
        component: () => import("pages/ErrorNotFound.vue"),
    },
];

export default routes;
