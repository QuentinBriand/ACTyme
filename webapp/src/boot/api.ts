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
        baseUrl: window.process.env.APP_API_AUTH_BASE_URL ?? "Not Found",
        addSleepSeconds:
            window.process.env.API_ADD_SLEEP_SECONDS !== undefined
                ? parseInt(window.process.env.API_ADD_SLEEP_SECONDS)
                : undefined,
    });
    api.setCallbacks(
        tokens => {
            if (tokens.accessToken !== undefined) {
                authStore.setAccessToken(tokens.accessToken);
            }
            if (tokens.refreshToken !== undefined) {
                authStore.setRefreshToken(tokens.refreshToken);
            }
        },
        () => ({
            accessToken: authStore.accessToken,
            refreshToken: authStore.refreshToken,
        })
    );
    app.use(() => api);
});
