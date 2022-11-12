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
                    <q-card-section v-if="card.type === 'cell'">
                        <q-btn> A </q-btn>
                        <q-btn> A </q-btn>
                    </q-card-section>
                    <q-card-section v-else>
                        {{ card.title }}
                    </q-card-section>
                </q-card>
            </div>
        </q-page>
    </div>
</template>

<script setup lang="ts">
import PageContentLoader from "src/components/PageContentLoader.vue";
import TheSidebar from "src/components/TheSidebar.vue";
import { useMatrixStore } from "src/stores/matrix.store";
import { useUserProfileStore } from "src/stores/userProfile.store";
import { ISidebarActions } from "src/types/ISidebarActions";
import { Matrix } from "src/types/Matrix";
import { ref } from "vue";

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
const tableCards = ref(createTableCards(matrixStore._currentMatrix));
const matrixWidth = matrixStore._currentMatrix.determinantsKeys.length + 1;
</script>

<style scoped lang="sass">
.grid
    display: grid
    grid-template-columns: repeat(v-bind('matrixWidth'), 1fr)
</style>
