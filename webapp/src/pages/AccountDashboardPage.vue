<template>
    <the-sidebar :actions="actions" />
    <page-content-loader
        v-if="!userProfileStore.initted && !matrixStore.initted"
    />
    <matrix-table v-else />
</template>

<script setup lang="ts">
import PageContentLoader from "src/components/PageContentLoader.vue";
import TheSidebar from "src/components/TheSidebar.vue";
import { useMatrixStore } from "src/stores/matrix.store";
import { useUserProfileStore } from "src/stores/userProfile.store";
import { ISidebarActions } from "src/types/ISidebarActions";
import MatrixTable from "src/components/MatrixTable.vue";
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
</script>

<style scoped lang="sass">

.button-progess
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    display: flex
    align-items: center
    justify-content: center
    font-weight: 450

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

.card-container
    width: 100%
    height: 100%
</style>
