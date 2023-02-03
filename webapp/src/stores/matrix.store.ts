import { keyBy } from "lodash";
import { defineStore } from "pinia";

import { ActymeError } from "src/classes/ActymeError";
import { Matrix } from "src/types/Matrix";
import { matrix } from "../../example";
export interface MatrixType {
    initted: boolean;
    loading: boolean;

    _currentMatrix: Matrix | null;
}

export class ActymeInvalidMatrixError extends ActymeError {
    public constructor(matrixId: string) {
        super({
            name: "userProfile.invalidMatrixId",
            message: 'invalid account id="%s"',
            args: [matrixId],
        });
    }
}

export const useMatrixStore = defineStore("matrix", {
    // Initial state.
    state: (): MatrixType => ({
        initted: false,
        loading: false,

        _currentMatrix: null,
    }),

    getters: {
        determinantsKeysById: state => {
            if (!state._currentMatrix) {
                return {};
            }

            return keyBy(state._currentMatrix.determinantsKeys, "id");
        },
        maxCells: state => {
            if (!state._currentMatrix) {
                return 0;
            }

            return (
                state._currentMatrix.determinantsKeys.length *
                state._currentMatrix.successKeys.length
            );
        },
        matrixWidth: state => {
            if (!state._currentMatrix) {
                return 0;
            }

            return state._currentMatrix.determinantsKeys.length + 1;
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
            // const api = useApi();
            this._currentMatrix = matrix;
            // OK, let's go.
            try {
                this.loading = true;
                this.initted = true;
            } catch (error) {
                this.$reset();
                throw error;
            } finally {
                this.loading = false;
            }
        },
        addEmptyCell() {
            if (
                this._currentMatrix === null ||
                this._currentMatrix.cells.length === this.maxCells
            ) {
                return;
            }
            this._currentMatrix.cells.push({
                id: this._currentMatrix.cells.length,
                evaluation_note: 0,
                action_note: 0,
                criteria: [],
                actions: [],
            });
        },
        addEmptyDeterminant() {
            console.log("addEmptyDeterminant");
            if (
                this._currentMatrix === null ||
                this._currentMatrix.determinantsKeys.length === 4
            ) {
                return;
            }
            this._currentMatrix.determinantsKeys.push({
                id: this._currentMatrix.determinantsKeys.length,
                title: "NEW ",
            });
        },
        addEmptySuccessKey() {
            console.log("addEmptySuccessKey");
            if (
                this._currentMatrix === null ||
                this._currentMatrix.successKeys.length === 4
            ) {
                return;
            }
            this._currentMatrix.successKeys.push({
                id: this._currentMatrix.successKeys.length,
                title: "",
            });
        },
    },
});
