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
            {
                name: "auth.passwordRequest",
                path: "password-request",
                component: () => import("src/pages/AuthPasswordRequest.vue"),
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
                name: "account",
                path: "account",
                component: () => import("src/pages/AccountWrapper.vue"),
                children: [
                    {
                        name: "account.dashboard",
                        path: "dashboard",
                        component: () =>
                            import("src/pages/AccountDashboard.vue"),
                    },
                    {
                        name: "account.details",
                        path: "details",
                        component: () => import("src/pages/AccountDetails.vue"),
                    },
                ],
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
