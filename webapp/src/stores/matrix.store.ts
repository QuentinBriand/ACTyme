import { keyBy } from "lodash";
import { defineStore } from "pinia";

import { ActymeError } from "src/classes/ActymeError";
import {
    Matrix,
    MatrixAction,
    MatrixActionState,
    MatrixComment,
    MatrixCriteria,
} from "src/types/Matrix";
import { matrixEmpty } from "../../example";
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
            // this._currentMatrix = matrix;
            // this._currentMatrix = matrixEmpty;
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
        addEmptyCell(index: number) {
            if (
                this._currentMatrix === null ||
                this._currentMatrix.cells.length === this.maxCells
            ) {
                return;
            }
            this._currentMatrix.cells.splice(index, 0, {
                id: index,
                action_note: 0,
                evaluation_note: 0,
                criteria: [],
                actions: [],
            });
        },
        removeCell(index: number) {
            if (this._currentMatrix === null) {
                return;
            }
            this._currentMatrix.cells.splice(index, 1);
        },
        addEmptyDeterminantKey() {
            console.log("addEmptyDeterminant");
            if (
                this._currentMatrix === null ||
                this._currentMatrix.determinantsKeys.length === 4
            ) {
                return;
            }
            this._currentMatrix.determinantsKeys.push({
                id: this._currentMatrix.determinantsKeys.length + 1,
                title: "Nouveau Determinant",
            });
            for (let i = 1; i <= this._currentMatrix.successKeys.length; i++) {
                this.addEmptyCell(
                    this._currentMatrix.determinantsKeys.length * i - 1
                );
            }
            this._currentMatrix.cells.forEach((cell, index) => {
                cell.id = index;
            });
        },
        addEmptySuccessKey() {
            console.log("addEmptySuccessKey");
            if (
                this._currentMatrix === null ||
                this._currentMatrix.successKeys.length === 5
            ) {
                return;
            }
            this._currentMatrix.successKeys.push({
                id: this._currentMatrix.successKeys.length + 1,
                title: "Nouveau Succès",
            });
            for (
                let i = 0;
                i < this._currentMatrix.determinantsKeys.length;
                i++
            ) {
                this.addEmptyCell(
                    this._currentMatrix.determinantsKeys.length *
                        this._currentMatrix.successKeys.length -
                        1
                );
            }
            this._currentMatrix.cells.forEach((cell, index) => {
                cell.id = index;
            });
        },
        deleteDeterminantKey(determinantKeyId: number) {
            if (this._currentMatrix === null) {
                return;
            }
            const determinantKeyIndex =
                this._currentMatrix.determinantsKeys.findIndex(
                    determinantKey => determinantKey.id === determinantKeyId
                );
            this._currentMatrix.determinantsKeys.splice(determinantKeyIndex, 1);
            this._currentMatrix.cells.forEach((cell, index) => {
                cell.id = index;
            });

            for (let i = 0; i < this._currentMatrix.successKeys.length; i++) {
                this.removeCell(
                    this._currentMatrix.determinantsKeys.length * i +
                        determinantKeyIndex
                );
            }
        },
        deleteSuccessKey(successKeyId: number) {
            if (this._currentMatrix === null) {
                return;
            }
            const successKeyIndex = this._currentMatrix.successKeys.findIndex(
                successKey => successKey.id === successKeyId
            );
            console.log(successKeyIndex);
            this._currentMatrix.successKeys.splice(successKeyIndex, 1);
            this._currentMatrix.cells.forEach((cell, index) => {
                cell.id = index;
            });
            for (
                let i = 0;
                i < this._currentMatrix.determinantsKeys.length;
                i++
            ) {
                console.log(this._currentMatrix.determinantsKeys.length *
                  successKeyId - 1 - i
                );
                this.removeCell(
                    this._currentMatrix.determinantsKeys.length *
                    successKeyId - 1 - i
                );
            }
        },
        addActionToCell(cellId: number, action: MatrixAction) {
            if (this._currentMatrix === null) {
                return;
            }
            const cellIndex = this._currentMatrix.cells.findIndex(
                cell => cell.id === cellId
            );
            this._currentMatrix.cells[cellIndex].actions.push(action);
        },
        addCriteriaToCell(cellId: number, criteria: MatrixCriteria) {
            if (this._currentMatrix === null) {
                return;
            }
            const cellIndex = this._currentMatrix.cells.findIndex(
                cell => cell.id === cellId
            );
            this._currentMatrix.cells[cellIndex].criteria.push(criteria);
        },
        updateCellActionTitle(cellId: number, actionId: number, title: string) {
            if (this._currentMatrix === null) {
                return;
            }
            const cellIndex = this._currentMatrix.cells.findIndex(
                cell => cell.id === cellId
            );
            const actionIndex = this._currentMatrix.cells[
                cellIndex
            ].actions.findIndex(action => action.id === actionId);
            this._currentMatrix.cells[cellIndex].actions[actionIndex].title =
                title;
        },
        updateCellCriteriaTitle(
            cellId: number,
            criteriaId: number,
            title: string
        ) {
            if (this._currentMatrix === null) {
                return;
            }
            const cellIndex = this._currentMatrix.cells.findIndex(
                cell => cell.id === cellId
            );
            const criteriaIndex = this._currentMatrix.cells[
                cellIndex
            ].criteria.findIndex(criteria => criteria.id === criteriaId);
            this._currentMatrix.cells[cellIndex].criteria[criteriaIndex].title =
                title;
        },
        deleteCellAction(cellId: number, actionId: number) {
            if (this._currentMatrix === null) {
                return;
            }
            const cellIndex = this._currentMatrix.cells.findIndex(
                cell => cell.id === cellId
            );
            const actionIndex = this._currentMatrix.cells[
                cellIndex
            ].actions.findIndex(action => action.id === actionId);
            this._currentMatrix.cells[cellIndex].actions.splice(actionIndex, 1);
        },
        deleteCellCriteria(cellId: number, criteriaId: number) {
            if (this._currentMatrix === null) {
                return;
            }
            const cellIndex = this._currentMatrix.cells.findIndex(
                cell => cell.id === cellId
            );
            const criteriaIndex = this._currentMatrix.cells[
                cellIndex
            ].criteria.findIndex(criteria => criteria.id === criteriaId);
            this._currentMatrix.cells[cellIndex].criteria.splice(
                criteriaIndex,
                1
            );
        },
        updateDeterminantKeyTitle(
            determinantKeyId: number,
            title: string
        ): void {
            if (this._currentMatrix === null) {
                return;
            }
            const determinantKeyIndex =
                this._currentMatrix.determinantsKeys.findIndex(
                    determinantKey => determinantKey.id === determinantKeyId
                );
            this._currentMatrix.determinantsKeys[determinantKeyIndex].title =
                title;
        },
        updateSuccessKeyTitle(successKeyId: number, title: string): void {
            if (this._currentMatrix === null) {
                return;
            }
            const successKeyIndex = this._currentMatrix.successKeys.findIndex(
                successKey => successKey.id === successKeyId
            );
            this._currentMatrix.successKeys[successKeyIndex].title = title;
        },
        setMatrix(matrix: Matrix) {
            this._currentMatrix = matrix;
        },
        setDefaultMatrix() {
            this._currentMatrix = matrixEmpty;
        },
        updateCellActionState(
            state: MatrixActionState,
            cellId: number,
            actionId: number
        ) {
            if (this._currentMatrix === null) {
                return;
            }
            const cellIndex = this._currentMatrix.cells.findIndex(
                cell => cell.id === cellId
            );
            this._currentMatrix.cells[cellIndex].actions[actionId].state =
                state;
        },
        updateCellActionCheckbox(
            checked: boolean,
            cellId: number,
            actionId: number
        ) {
            if (this._currentMatrix === null) {
                return;
            }
            const cellIndex = this._currentMatrix.cells.findIndex(
                cell => cell.id === cellId
            );
            this._currentMatrix.cells[cellIndex].actions[actionId].checked =
                checked;
        },
        setLinkedActions(
            linkedActions: number[],
            cellId: number,
            criteriaId: number
        ) {
            if (this._currentMatrix === null) {
                return;
            }
            const cellIndex = this._currentMatrix.cells.findIndex(
                cell => cell.id === cellId
            );
            this._currentMatrix.cells[cellIndex].criteria[
                criteriaId
            ].impactedActionsIds = linkedActions;
        },
        setLinkedCriteria(
            linkedCriteria: number[],
            cellId: number,
            actionId: number
        ) {
            if (this._currentMatrix === null) {
                return;
            }
            const cellIndex = this._currentMatrix.cells.findIndex(
                cell => cell.id === cellId
            );
            this._currentMatrix.cells[cellIndex].actions[
                actionId
            ].impactedCriteriaIds = linkedCriteria;
        },
        addComment(comment: MatrixComment) {
            if (this._currentMatrix === null) {
                return;
            }
            this._currentMatrix.comments.push(comment);
        },
    },
});
