/**
 * Copyright (c) 2022 - Indigen Solutions
 * Authors:
 * - Jérôme CLERICO <jerome.clerico@indigen.com>
 * - Antoine FRANKEL <antoine.frankel@indigen.com>
 * NOTICE: All information contained herein is, and remains
 * the property of Indigen Solutions and its suppliers,
 * if any,
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Indigen Solutions.
 */
import { boot } from "quasar/wrappers";
import { useApi } from "src/hooks/useApi";
import { useAuthStore } from "src/stores/auth.store";

export default boot(({ app }) => {
    const api = useApi();
    const authStore = useAuthStore();
    api.setConfig({
        baseUrl: process.env.API_BASE_URL ?? "Not Found",
        addSleepSeconds:
            process.env.API_ADD_SLEEP_SECONDS !== undefined
                ? parseInt(process.env.API_ADD_SLEEP_SECONDS)
                : undefined,
    });
    api.setCallbacks(
        tokens => {
            if (tokens.accessToken !== undefined) {
                authStore.setAccessToken(tokens.accessToken);
            }
        },
        () => ({
            accessToken: "",
        })
    );
    app.use(() => api);
});
