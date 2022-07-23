/**
 * Copyright (c) 2022 - Indigen Solutions
 * Authors:
 *   - Jérôme CLERICO <jerome.clerico@indigen.com>
 *   - Antoine FRANKEL <antoine.frankel@indigen.com>
 *   - Anthony BUSNEL <anthony.busnel@indigen.com>
 * NOTICE: All information contained herein is, and remains
 * the property of Indigen Solutions and its suppliers,
 * if any.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Indigen Solutions.
 */

import { RouteLocationRaw, useRoute, useRouter } from "vue-router";

export function useNavigate() {
    const router = useRouter();
    const route = useRoute();

    const navigate = (name: string, id?: string) => {
        if (name === "") return;

        const redirect = checkRedirect();

        if (redirect !== "") {
            router.push({ name, query: { redirect } });
        } else if (name.includes("project") && id !== undefined) {
            router.push({ name, params: { projectId: id } });
        } else if (name.includes("partner") && id !== undefined) {
            router.push({ name, params: { accountId: id } });
        } else {
            router.push({ name });
        }
    };

    const navigateRaw = (route: string | RouteLocationRaw) => {
        console.log("navigateRaw", route);
        router.push(route);
    };

    const checkRedirect = () => {
        const redirect = route.query.redirect as RouteLocationRaw;
        if (redirect) {
            return redirect as string;
        }
        return "";
    };

    const getQueryParam = (name: string) => {
        const query = route.query;
        return query[name];
    };

    const getParams = (name: string) => {
        const params = route.params;
        return params[name];
    };

    return { navigate, navigateRaw, getQueryParam, getParams };
}
