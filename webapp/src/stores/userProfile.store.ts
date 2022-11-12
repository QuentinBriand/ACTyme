import firebase from "firebase/compat/app";
import { chain } from "lodash";
import { defineStore } from "pinia";

import { ActymeError } from "src/classes/ActymeError";
import { useApi } from "src/hooks/useApi";
import { UserProfileMatrixDto } from "src/services/api/user-profile-matrix.dto";

export interface UserProfileType {
    initted: boolean;
    loading: boolean;

    user: firebase.User | null;
    matrices: UserProfileMatrixDto[] | null;
    currentMatrixId: string | null;
}

export class ActymeInvalidMatrixError extends ActymeError {
    public constructor(accountId: string) {
        super({
            name: "userProfile.invalidMatrixId",
            message: 'invalid account id="%s"',
            args: [accountId],
        });
    }
}

export const useUserProfileStore = defineStore("userProfile", {
    // Initial state.
    state: (): UserProfileType => ({
        initted: false,
        loading: false,

        user: null,
        matrices: null,
        currentMatrixId: null,
    }),

    getters: {
        matricesById: state => {
            return chain(state.matrices).keyBy("id").value();
        },
    },

    actions: {
        async init(force = false) {
            // Alreading working?
            if (this.loading) {
                return;
            }

            // Already initted?
            if (this.initted && !force) {
                return;
            }

            // Reset in the initial state.
            this.$reset();

            // Get some materials.
            const api = useApi();

            // OK, let's go.
            try {
                this.loading = true;

                const me = await api.getMe();

                // this.user = me.user;

                // this.matrices = me.matrices;

                this.initted = true;
            } catch (error) {
                this.$reset();
                throw error;
            } finally {
                this.loading = false;
            }
        },
    },
});
