import { defineStore } from "pinia";
import firebase from "firebase/compat/app";

export interface AuthStoreType {
    initted: boolean;
    accessToken: string | null; // Null means, no access token (or expired)
    user: firebase.User | null;
}

const _useAuthStore = defineStore("auth", {
    state: (): AuthStoreType => ({
        initted: false,
        accessToken: null,
        user: null,
    }),

    getters: {
        isLogged(state) {
            return state.accessToken !== null;
        },
    },

    actions: {
        init() {
            if (this.initted === true) {
                return;
            }
            try {
                this.accessToken = sessionStorage.getItem("auth.accessToken");
                this.initted = true;
            } catch (error) {
                this.$reset();
                throw error;
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
