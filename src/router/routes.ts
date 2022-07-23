import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "home",
        component: () => import("src/layouts/LandingLayout.vue"),
        meta: { requireAuth: false },
        children: [
            {
                path: "/sign-in",
                name: "signIn",
                component: () => import("components/AuthSignIn.vue"),
            },
            {
                path: "/password-request",
                name: "passwordRequest",
                component: () => import("components/AuthPasswordRequest.vue"),
            },
            {
                path: "/password-reset",
                name: "passwordReset",
                component: () => import("components/AuthPasswordReset.vue"),
            },
            {
                path: "/about",
                name: "about",
                component: () => import("src/pages/unauthenticated/PageAbout.vue"),
            },
            {
                path: "/privacy-policy",
                name: "privacyPolicy",
                component: () => import("src/pages/unauthenticated/PagePrivacyPolicy.vue"),
            },
            {
                path: "/contact",
                name: "contact",
                component: () => import("pages/Contact.vue"),
            },
        ],
    },
    {
        path: "/:catchAll(.*)*",
        component: () => import("src/pages/PageErrorNotFound.vue"),
    },
];

export default routes;
