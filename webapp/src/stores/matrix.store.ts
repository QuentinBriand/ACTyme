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
                    { title: "Mon poid", id: 1 },
                    { title: "Mes relations avec les soignants", id: 2 },
                    { title: "La connaissance de la maladie", id: 3 },
                    { title: "Me sentir heureux de vivre", id: 4 },
                ],
                determinantsKeys: [
                    {
                        title: "Moi",
                        id: 1,
                    },
                    { title: "Moi et les autres", id: 2 },
                    { title: "Moi et mon environement", id: 3 },
                ],
                cells: [
                    {
                        id: 1,
                        evaluation_note: 2,
                        action_note: 3,
                        criteria: [
                            {
                                id: 1,
                                title: "Arriver à un poid stable et un IMC correct",
                                impactedActionsIds: [1, 2],
                            },
                            {
                                id: 2,
                                title: "Ton poids est-il un frein à certaines activités ?",
                                impactedActionsIds: [1, 2, 3],
                            }
                        ],
                        actions: [
                            {
                                id: 1,
                                title: "Faire du sport",
                                type: "progress",
                                state: "notStarted",
                                impactedCriteriaIds: [3, 2],
                            },
                            {
                                id: 2,
                                title: "Entamer un régime",
                                type: "checkbox",
                                checked: false,
                                impactedCriteriaIds: [1, 2],
                            },
                            {
                                id: 3,
                                title: "Faire attention à mon alimentation",
                                type: "checkbox",
                                checked: false,
                                impactedCriteriaIds: [1, 2],
                            }
                        ],
                    },
                    {
                        id: 2,
                        evaluation_note: 2,
                        action_note: 3,
                        criteria: [
                            {
                                id: 1,
                                title: "Comment perçois-tu le regard des autres sur ta silhouette ?",
                                impactedActionsIds: [2],
                            }
                        ],
                        actions: [
                            {
                                id: 1,
                                title: "Prendre un coach pour m'aider",
                                type: "checkbox",
                                checked: false,
                                impactedCriteriaIds: [3, 2],
                            },
                            {
                                id: 2,
                                title: "Prendre une diététicienne pour m'aider",
                                type: "checkbox",
                                checked: false,
                                impactedCriteriaIds: [1, 2],
                            },
                            {
                                id: 3,
                                title: "Réfléchir à aller vers de l'hypnothérapie pour y arriver",
                                type: "progress",
                                state: "notStarted",
                                impactedCriteriaIds: [1, 2],
                            }
                        ],
                    },
                    {
                        id: 3,
                        evaluation_note: 2,
                        action_note: 3,
                        criteria: [
                            {
                                id: 1,
                                title: "A quel point estimes-tu ton environement favorable à ta perte de poid ?",
                                impactedActionsIds: [2],
                            },
                            {
                                id: 2,
                                title: "As-tu un environement aidant ?",
                                impactedActionsIds: [2],
                            }
                        ],
                        actions: [
                            {
                                id: 1,
                                title: "Faire une semaine de marche",
                                type: "progress",
                                state: "notStarted",
                                impactedCriteriaIds: [3, 2],
                            }
                        ],
                    },
                    {
                        id: 4,
                        evaluation_note: 2,
                        action_note: 3,
                        criteria: [
                            {
                                id: 1,
                                title: "Entretenir une relation de confiance avec les soignants",
                                impactedActionsIds: [2],
                            },
                        ],
                        actions: [
                            {
                                id: 1,
                                title: "Poser plus de questions sur les résultats",
                                type: "checkbox",
                                checked: false,
                                impactedCriteriaIds: [1, 2],
                            },
                            {
                                id: 2,
                                title: "M'impliquer un peu plus dans la relation",
                                type: "progress",
                                state: "notStarted",
                                impactedCriteriaIds: [3, 2],
                            }
                        ],
                    },
                    {
                        id: 5,
                        evaluation_note: 2,
                        action_note: 3,
                        criteria: [
                            {
                                id: 1,
                                title: "Quel niveau de confiance as-tu avec les soignants ?",
                                impactedActionsIds: [1, 2],
                            }
                        ],
                        actions: [
                            {
                                id: 1,
                                title: "Me former aux relations patient/soignant",
                                type: "progress",
                                state: "notStarted",
                                impactedCriteriaIds: [3, 2],
                            },
                            {
                                id: 2,
                                title: "Travailler sur ma patience",
                                type: "progress",
                                state: "notStarted",
                                impactedCriteriaIds: [1],
                            }
                        ],
                    },
                    {
                        id: 6,
                        evaluation_note: 2,
                        action_note: 3,
                        criteria: [
                            {
                                id: 1,
                                title: "L'environement hospitalier est-il favorable à ma perte de poid ?",
                                impactedActionsIds: [1],
                            }
                        ],
                        actions: [
                            {
                                id: 1,
                                title: "T'engager dans des actions avec des soignants",
                                type: "progress",
                                state: "notStarted",
                                impactedCriteriaIds: [3, 2],
                            }
                        ],
                    },
                    {
                        id: 7,
                        evaluation_note: 2,
                        action_note: 3,
                        criteria: [
                            {
                                id: 1,
                                title: "Connais-tu vraiment tes pathologies",
                                impactedActionsIds: [1, 2],
                            }
                        ],
                        actions: [
                            {
                                id: 1,
                                title: "Faire des recherches sur Internet",
                                type: "checkbox",
                                checked: false,
                                impactedCriteriaIds: [1],
                            },
                            {
                                id: 2,
                                title: "Poser plus de questions aux soignants",
                                type: "checkbox",
                                checked: false,
                                impactedCriteriaIds: [1],
                            }
                        ],
                    },
                    {
                        id: 8,
                        evaluation_note: 2,
                        action_note: 3,
                        criteria: [
                            {
                                id: 1,
                                title: "Quel niveau de connaissance penses-tu avoir sur tes maladies ?",
                                impactedActionsIds: [1],
                            }
                        ],
                        actions: [
                            {
                                id: 1,
                                title: "Voir pour trouver d'autres patients atteints de la même maladie",
                                type: "progress",
                                state: "notStarted",
                                impactedCriteriaIds: [1],
                            }
                        ],
                    },
                    {
                        id: 9,
                        evaluation_note: 2,
                        action_note: 3,
                        criteria: [
                            {
                                id: 1,
                                title: "Comment vie-tu la rareté de tes maladies ?",
                                impactedActionsIds: [2],
                            }
                        ],
                        actions: [
                            {
                                id: 1,
                                title: "Participer à des conférences",
                                type: "progress",
                                state: "notStarted",
                                impactedCriteriaIds: [3, 2],
                            }
                        ],
                    },
                    {
                        id: 10,
                        evaluation_note: 2,
                        action_note: 3,
                        criteria: [
                            {
                                id: 1,
                                title: "Est-tu heureux de vivre ?",
                                impactedActionsIds: [1],
                            },
                            {
                                id: 2,
                                title: "Éprouves-tu de la joie à te lever le matin ?",
                                impactedActionsIds: [1],
                            }
                        ],
                        actions: [
                            {
                                id: 1,
                                title: "Faire des activités de plaisirs en priorité",
                                type: "checkbox",
                                checked: false,
                                impactedCriteriaIds: [1, 2],
                            },
                            {
                                id: 2,
                                title: "Continuer de faire le bien autour de moi",
                                type: "checkbox",
                                checked: false,
                                impactedCriteriaIds: [1, 2],
                            },
                            {
                                id: 3,
                                title: "Prendre du temps pour moi",
                                type: "checkbox",
                                checked: false,
                                impactedCriteriaIds: [1, 2],
                            }
                        ],
                    },
                    {
                        id: 11,
                        evaluation_note: 2,
                        action_note: 3,
                        criteria: [
                            {
                                id: 1,
                                title: "À ton avis, comment les autres te perçoivent ton bien-être ?",
                                impactedActionsIds: [1],
                            }
                        ],
                        actions: [
                            {
                                id: 1,
                                title: "Trouver des passions communes avec d'autres personnes",
                                type: "progress",
                                state: "notStarted",
                                impactedCriteriaIds: [1],
                            },
                            {
                                id: 2,
                                title: "Continuer les sorties de motos",
                                type: "checkbox",
                                checked: false,
                                impactedCriteriaIds: [1],
                            },
                            {
                                id: 3,
                                title: "Mettre en place des projets communs avec d'autres",
                                type: "progress",
                                state: "notStarted",
                                impactedCriteriaIds: [1],
                            }
                        ],
                    },
                    {
                        id: 12,
                        evaluation_note: 2,
                        action_note: 3,
                        criteria: [
                            {
                                id: 1,
                                title: "Ton cadre de vie est-il favorable à ton bien-être ?",
                                impactedActionsIds: [2],
                            }
                        ],
                        actions: [
                            {
                                id: 1,
                                title: "Prendre des vacances loin de chez toi",
                                type: "progress",
                                state: "notStarted",
                                impactedCriteriaIds: [1],
                            },
                            {
                                id: 2,
                                title: "Découvrir d'autres cultures",
                                type: "checkbox",
                                checked: false,
                                impactedCriteriaIds: [1],
                            }
                        ],
                    }
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
