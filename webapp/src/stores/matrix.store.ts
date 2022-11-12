import { keyBy } from "lodash";
import { defineStore } from "pinia";

import { ActymeError } from "src/classes/ActymeError";
import { Matrix } from "src/types/Matrix";

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
            this._currentMatrix = {
                id: "1",
                title: "Basic Example",
                successKeys: [
                    { title: "L'appartenance", id: 1 },
                    { title: "La crédibilité", id: 2 },
                    { title: "Le socle social", id: 3 },
                    { title: "La technologie au coeur de l'entreprise", id: 4 },
                ],
                determinantsKeys: [
                    {
                        title: "Environnementaux / les contraintes socio-économiques",
                        id: 1,
                    },
                    { title: "Sociétal / les institutions", id: 2 },
                    { title: "Humain / Les acteurs", id: 3 },
                ],
                cells: [
                    {
                        id: 1,
                        note: 5,
                        criteria: [
                            {
                                id: 1,
                                title: "Participation à des colloques de branches ou territoriaux",
                                impactedActionsIds: [1, 2, 3],
                            },
                            {
                                id: 2,
                                title: "Adhésion à un syndicat d'entreprise / branche",
                                impactedActionsIds: [1, 2, 3],
                            },
                            {
                                id: 3,
                                title: "Boubakar",
                                impactedActionsIds: [1, 2, 3],
                            },
                        ],
                        actions: [
                            {
                                id: 1,
                                title: "Adhérer à des organisations professionnelles",
                                type: "progress",
                                state: "notStarted",
                            },
                            {
                                id: 2,
                                title: "Adhérer à une association d'aide aux entreprises sur les faits sociétaux",
                                type: "checkbox",
                                checked: true,
                            },
                        ],
                    },
                    {
                        id: 2,
                        note: 5,
                        criteria: [
                            {
                                id: 1,
                                title: "Participation à des colloques de branches ou territoriaux",
                                impactedActionsIds: [1, 2, 3],
                            },
                            {
                                id: 2,
                                title: "Adhésion à un syndicat d'entreprise / branche",
                                impactedActionsIds: [1, 2, 3],
                            },
                            {
                                id: 3,
                                title: "Boubakar",
                                impactedActionsIds: [1, 2, 3],
                            },
                        ],
                        actions: [
                            {
                                id: 1,
                                title: "Adhérer à des organisations professionnelles",
                                type: "progress",
                                state: "notStarted",
                            },
                            {
                                id: 2,
                                title: "Adhérer à une association d'aide aux entreprises sur les faits sociétaux",
                                type: "checkbox",
                                checked: true,
                            },
                        ],
                    },
                    {
                        id: 3,
                        note: 5,
                        criteria: [
                            {
                                id: 1,
                                title: "Participation à des colloques de branches ou territoriaux",
                                impactedActionsIds: [1, 2, 3],
                            },
                            {
                                id: 2,
                                title: "Adhésion à un syndicat d'entreprise / branche",
                                impactedActionsIds: [1, 2, 3],
                            },
                            {
                                id: 3,
                                title: "Boubakar",
                                impactedActionsIds: [1, 2, 3],
                            },
                        ],
                        actions: [
                            {
                                id: 1,
                                title: "Adhérer à des organisations professionnelles",
                                type: "progress",
                                state: "notStarted",
                            },
                            {
                                id: 2,
                                title: "Adhérer à une association d'aide aux entreprises sur les faits sociétaux",
                                type: "checkbox",
                                checked: true,
                            },
                        ],
                    },
                    {
                        id: 4,
                        note: 5,
                        criteria: [
                            {
                                id: 1,
                                title: "Participation à des colloques de branches ou territoriaux",
                                impactedActionsIds: [1, 2, 3],
                            },
                            {
                                id: 2,
                                title: "Adhésion à un syndicat d'entreprise / branche",
                                impactedActionsIds: [1, 2, 3],
                            },
                            {
                                id: 3,
                                title: "Boubakar",
                                impactedActionsIds: [1, 2, 3],
                            },
                        ],
                        actions: [
                            {
                                id: 1,
                                title: "Adhérer à des organisations professionnelles",
                                type: "progress",
                                state: "notStarted",
                            },
                            {
                                id: 2,
                                title: "Adhérer à une association d'aide aux entreprises sur les faits sociétaux",
                                type: "checkbox",
                                checked: true,
                            },
                        ],
                    },
                    {
                        id: 5,
                        note: 5,
                        criteria: [
                            {
                                id: 1,
                                title: "Participation à des colloques de branches ou territoriaux",
                                impactedActionsIds: [1, 2, 3],
                            },
                            {
                                id: 2,
                                title: "Adhésion à un syndicat d'entreprise / branche",
                                impactedActionsIds: [1, 2, 3],
                            },
                            {
                                id: 3,
                                title: "Boubakar",
                                impactedActionsIds: [1, 2, 3],
                            },
                        ],
                        actions: [
                            {
                                id: 1,
                                title: "Adhérer à des organisations professionnelles",
                                type: "progress",
                                state: "notStarted",
                            },
                            {
                                id: 2,
                                title: "Adhérer à une association d'aide aux entreprises sur les faits sociétaux",
                                type: "checkbox",
                                checked: true,
                            },
                        ],
                    },
                    {
                        id: 6,
                        note: 5,
                        criteria: [
                            {
                                id: 1,
                                title: "Participation à des colloques de branches ou territoriaux",
                                impactedActionsIds: [1, 2, 3],
                            },
                            {
                                id: 2,
                                title: "Adhésion à un syndicat d'entreprise / branche",
                                impactedActionsIds: [1, 2, 3],
                            },
                            {
                                id: 3,
                                title: "Boubakar",
                                impactedActionsIds: [1, 2, 3],
                            },
                        ],
                        actions: [
                            {
                                id: 1,
                                title: "Adhérer à des organisations professionnelles",
                                type: "progress",
                                state: "notStarted",
                            },
                            {
                                id: 2,
                                title: "Adhérer à une association d'aide aux entreprises sur les faits sociétaux",
                                type: "checkbox",
                                checked: true,
                            },
                        ],
                    },
                    {
                        id: 7,
                        note: 5,
                        criteria: [
                            {
                                id: 1,
                                title: "Participation à des colloques de branches ou territoriaux",
                                impactedActionsIds: [1, 2, 3],
                            },
                            {
                                id: 2,
                                title: "Adhésion à un syndicat d'entreprise / branche",
                                impactedActionsIds: [1, 2, 3],
                            },
                            {
                                id: 3,
                                title: "Boubakar",
                                impactedActionsIds: [1, 2, 3],
                            },
                        ],
                        actions: [
                            {
                                id: 1,
                                title: "Adhérer à des organisations professionnelles",
                                type: "progress",
                                state: "notStarted",
                            },
                            {
                                id: 2,
                                title: "Adhérer à une association d'aide aux entreprises sur les faits sociétaux",
                                type: "checkbox",
                                checked: true,
                            },
                        ],
                    },
                    {
                        id: 8,
                        note: 5,
                        criteria: [
                            {
                                id: 1,
                                title: "Participation à des colloques de branches ou territoriaux",
                                impactedActionsIds: [1, 2, 3],
                            },
                            {
                                id: 2,
                                title: "Adhésion à un syndicat d'entreprise / branche",
                                impactedActionsIds: [1, 2, 3],
                            },
                            {
                                id: 3,
                                title: "Boubakar",
                                impactedActionsIds: [1, 2, 3],
                            },
                        ],
                        actions: [
                            {
                                id: 1,
                                title: "Adhérer à des organisations professionnelles",
                                type: "progress",
                                state: "notStarted",
                            },
                            {
                                id: 2,
                                title: "Adhérer à une association d'aide aux entreprises sur les faits sociétaux",
                                type: "checkbox",
                                checked: true,
                            },
                        ],
                    },
                    {
                        id: 9,
                        note: 5,
                        criteria: [
                            {
                                id: 1,
                                title: "Participation à des colloques de branches ou territoriaux",
                                impactedActionsIds: [1, 2, 3],
                            },
                            {
                                id: 2,
                                title: "Adhésion à un syndicat d'entreprise / branche",
                                impactedActionsIds: [1, 2, 3],
                            },
                            {
                                id: 3,
                                title: "Boubakar",
                                impactedActionsIds: [1, 2, 3],
                            },
                        ],
                        actions: [
                            {
                                id: 1,
                                title: "Adhérer à des organisations professionnelles",
                                type: "progress",
                                state: "notStarted",
                            },
                            {
                                id: 2,
                                title: "Adhérer à une association d'aide aux entreprises sur les faits sociétaux",
                                type: "checkbox",
                                checked: true,
                            },
                        ],
                    },
                    {
                        id: 10,
                        note: 5,
                        criteria: [
                            {
                                id: 1,
                                title: "Participation à des colloques de branches ou territoriaux",
                                impactedActionsIds: [1, 2, 3],
                            },
                            {
                                id: 2,
                                title: "Adhésion à un syndicat d'entreprise / branche",
                                impactedActionsIds: [1, 2, 3],
                            },
                            {
                                id: 3,
                                title: "Boubakar",
                                impactedActionsIds: [1, 2, 3],
                            },
                        ],
                        actions: [
                            {
                                id: 1,
                                title: "Adhérer à des organisations professionnelles",
                                type: "progress",
                                state: "notStarted",
                            },
                            {
                                id: 2,
                                title: "Adhérer à une association d'aide aux entreprises sur les faits sociétaux",
                                type: "checkbox",
                                checked: true,
                            },
                        ],
                    },
                    {
                        id: 11,
                        note: 5,
                        criteria: [
                            {
                                id: 1,
                                title: "Participation à des colloques de branches ou territoriaux",
                                impactedActionsIds: [1, 2, 3],
                            },
                            {
                                id: 2,
                                title: "Adhésion à un syndicat d'entreprise / branche",
                                impactedActionsIds: [1, 2, 3],
                            },
                            {
                                id: 3,
                                title: "Boubakar",
                                impactedActionsIds: [1, 2, 3],
                            },
                        ],
                        actions: [
                            {
                                id: 1,
                                title: "Adhérer à des organisations professionnelles",
                                type: "progress",
                                state: "notStarted",
                            },
                            {
                                id: 2,
                                title: "Adhérer à une association d'aide aux entreprises sur les faits sociétaux",
                                type: "checkbox",
                                checked: true,
                            },
                        ],
                    },
                    {
                        id: 12,
                        note: 5,
                        criteria: [
                            {
                                id: 1,
                                title: "Participation à des colloques de branches ou territoriaux",
                                impactedActionsIds: [1, 2, 3],
                            },
                            {
                                id: 2,
                                title: "Adhésion à un syndicat d'entreprise / branche",
                                impactedActionsIds: [1, 2, 3],
                            },
                            {
                                id: 3,
                                title: "Boubakar",
                                impactedActionsIds: [1, 2, 3],
                            },
                        ],
                        actions: [
                            {
                                id: 1,
                                title: "Adhérer à des organisations professionnelles",
                                type: "progress",
                                state: "notStarted",
                            },
                            {
                                id: 2,
                                title: "Adhérer à une association d'aide aux entreprises sur les faits sociétaux",
                                type: "checkbox",
                                checked: true,
                            },
                        ],
                    },
                ],
            };
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
    },
});
