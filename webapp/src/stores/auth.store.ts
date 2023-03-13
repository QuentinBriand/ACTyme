import { defineStore } from "pinia";
import { UserMeResponse } from "src/services/api/user-me.dto";

export interface AuthStoreType {
    initted: boolean;
    loading: boolean;
    accessToken: string | null; // Null means, no access token (or expired)
}

const _useAuthStore = defineStore("auth", {
    state: (): AuthStoreType => ({
        initted: false,
        loading: false,
        accessToken: null,
    }),

    getters: {
        isLogged(state) {
            return state.accessToken !== null;
        },
    },

    actions: {
        async init() {
            if (this.loading === true) return;
            this.loading = true;
            if (this.initted === true) {
                return;
            }
            try {
                this.accessToken = sessionStorage.getItem("auth.accessToken");
                this.initted = true;
            } catch (error) {
                this.$reset();
                throw error;
            } finally {
                this.loading = false;
            }
        },

        setAccessToken(accessToken: string | null) {
            if (accessToken === null) {
                sessionStorage.removeItem("auth.accessToken");
            } else {
                sessionStorage.setItem("auth.accessToken", accessToken);
            }
            this.accessToken = accessToken;
        },
    },
});

export const useAuthStore = () => {
    const store = _useAuthStore();
    store.init();
    return store;
};
