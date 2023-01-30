<template>
    <the-sidebar :actions="actions" />
    <page-content-loader
        v-if="!userProfileStore.initted && !matrixStore.initted"
    />
    <router-view v-if="userProfileStore.initted && matrixStore.initted" />
    <div v-if="matrixStore._currentMatrix !== null">
        <div>
            <span class="text-h3">{{ matrixStore._currentMatrix.title }}</span>
        </div>
        <q-page class="row">
            <div class="row grid gap-sm column col">
                <q-card
                    flat
                    v-for="card in tableCards"
                    :key="card.type + card.id"
                    class="col"
                >
                    <q-card-section v-if="card.type === 'cell'" class="card-container">
                        <div>
                            <q-btn color="orange" class="ae-button centered-right-button" @click="popupCriteria[card.id - 1] = true">
                                <q-icon name="ads_click" style="color: #ffbb66" size="3vw" />
                            </q-btn>
                            <popup-details
                                v-model:modelValue="popupCriteria[card.id - 1]"
                                v-model:otherModelValue="popupActions[card.id - 1]"
                                :details="cells[card.id - 1].criteria"
                                title="Evaluations"
                            />
                            <q-btn color="blue" class="ae-button centered-left-button" @click="popupActions[card.id - 1] = true">
                                <q-icon name="rule" style="color:#A2CEEE" size="3vw"/>
                            </q-btn>
                            <popup-details
                                v-model:modelValue="popupActions[card.id - 1]"
                                v-model:otherModelValue="popupCriteria[card.id - 1]"
                                :details="cells[card.id - 1].actions"
                                title="Actions"/>
                        </div>
                        <div class="button-progess" style="display: flex; flex-direction: column; align-items: center; justify-content: center; font-weight: 450;">
                            <div>
                                <a style="color:orange; font-size: 1vw;">
                                    {{Math.floor(getCriteriaPercentage(matrixStore._currentMatrix.cells[card.id-1].criteria, card.id) * 100)}}%
                                </a>
                            </div>
                            <div>
                                <a style="color:#52A2DA; font-size: 1vw;">
                                    {{Math.floor(getActionsPercentage(matrixStore._currentMatrix.cells[card.id - 1].actions) * 100)}}%
                                </a>
                            </div>
                        </div>
                        <div class="button-progess">
                            <q-circular-progress
                            rounded
                            :value=getActionsPercentage(matrixStore._currentMatrix.cells[card.id-1].actions)
                            size="6vw"
                            :thickness="0.22"
                            color="blue"
                            reverse
                            :min="0"
                            :max="1"
                            track-color="grey-3"
                            class="q-ma-md"
                            />
                        </div>
                        <div class="button-progess">
                            <q-circular-progress
                            rounded
                            :value="getCriteriaPercentage(matrixStore._currentMatrix.cells[card.id-1].criteria, card.id)"
                            size="7.5vw"
                            :thickness="0.16"
                            color="orange"
                            reverse
                            :min="0"
                            :max="1"
                            track-color="grey-3"
                            class="q-ma-md"
                            />
                        </div>
                    </q-card-section>
                    <q-card-section style="height: 100%;" v-else>
                        <div class="centered-text" style="width: 100%;">
                            <p>
                                {{ card.title }}
                            </p>
                        </div>
                    </q-card-section>
                </q-card>
            </div>
        </q-page>
    </div>
</template>

<script setup lang="ts">
import PopupDetails from "src/components/PopupDetails.vue";
import PageContentLoader from "src/components/PageContentLoader.vue";
import TheSidebar from "src/components/TheSidebar.vue";
import { useMatrixStore } from "src/stores/matrix.store";
import { useUserProfileStore } from "src/stores/userProfile.store";
import { ISidebarActions } from "src/types/ISidebarActions";
import { Matrix, MatrixAction, MatrixCriteria } from "src/types/Matrix";
import { ref } from "vue";
import { link } from "fs";

const userProfileStore = useUserProfileStore();
const matrixStore = useMatrixStore();

userProfileStore.init();
matrixStore.init();

if (matrixStore._currentMatrix === null) {
    throw new Error("Matrix is null");
}
const actions: ISidebarActions[] = [
    {
        name: "projects",
        routeName: "partner.projects",
        icon: "projects",
        label: "accountInfos.fields.projects.label",
    },
    {
        name: "users",
        routeName: "partner.users",
        icon: "users",
        label: "accountInfos.fields.users.label",
    },
    {
        name: "details",
        routeName: "partner.details",
        icon: "informations",
        label: "accountInfos.fields.partnerAccount.label",
    },
];

interface TableCells {
    id: number;
    title?: string;
    type: "success" | "determinant" | "cell" | "header";
}

const createTableCards = (matrix: Matrix) => {
    const cards: TableCells[] = [{ id: 0, title: "", type: "header" }];
    matrix.determinantsKeys.forEach(determinantsKey => {
        cards.push({
            id: determinantsKey.id,
            title: determinantsKey.title,
            type: "success",
        });
    });
    matrix.cells.forEach((cell, index) => {
        if (index % matrix.determinantsKeys.length === 0) {
            cards.push({
                id: matrix.successKeys[index / matrix.determinantsKeys.length]
                    .id,
                title: matrix.successKeys[
                    index / matrix.determinantsKeys.length
                ].title,
                type: "determinant",
            });
        }
        cards.push({
            id: cell.id,
            type: "cell",
        });
    });
    return cards;
};

const getCriteriaPercentage = (criteria : MatrixCriteria[], cardId : number) => {
    let total = 0;
    criteria.forEach(crit => {
        const linkedActions = crit.impactedActionsIds;
        if (linkedActions === undefined || linkedActions.length === 0) {
            return;
        }
        const currentCard = matrixStore._currentMatrix?.cells[cardId - 1];
        if (currentCard === undefined) {
            return;
        }
        const linkedActionLength = linkedActions.length;
        let actionsDone = 0;
        linkedActions.forEach(actionId => {
            const action = currentCard.actions.find(action => action.id === actionId);
            if (action === undefined) {
                return;
            }
            actionsDone += isActionDone(action) ? 1 : 0;
        });
        total += actionsDone / linkedActionLength;
    });
    return total / criteria.length;
};

const getActionsPercentage = (matrixDetails : MatrixAction[]) => {
    let total = 0;
    matrixDetails.forEach((matrixDetail) => {
        total += isActionDone(matrixDetail) ? 1 : 0;
    });
    return total / matrixDetails.length;
};

const isActionDone = (action : MatrixAction) => {
    return action.type === "checkbox" ? action.checked : action.state === "done";
};

const tableCards = ref(createTableCards(matrixStore._currentMatrix));
const matrixWidth = matrixStore._currentMatrix.determinantsKeys.length + 1;
const cells = ref(matrixStore._currentMatrix.cells);
const matrixCellCount = cells.value.length + 1;

const popupCriteria = ref(new Array(matrixCellCount).fill(false));
const popupActions = ref(new Array(matrixCellCount).fill(false));
</script>

<style scoped lang="sass">

.button-progess
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)

.ae-button
    width: 4vw
    height: 16vh

.centered-left-button
    top: -10%
    left: 70%
    transform: translate(-70%, 10%)

.centered-right-button
    top: -10%
    left: 5%
    transform: translate(-5%, 10%)

.centered-text
    position: absolute
    top: 50%
    transform: translate(0, -50%)
    text-align: center
.grid
    display: grid
    grid-template-columns: repeat(v-bind('matrixWidth'), 1fr)

.card-container
    width: 100%
    height: 100%

</style>
