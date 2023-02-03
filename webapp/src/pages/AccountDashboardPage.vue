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
