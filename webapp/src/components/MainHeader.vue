<template>
    <q-header class="bg-grey-2 shadow-6">
        <q-toolbar class="text-dark q-px-xl q-py-md gap-sm">
            <button-logo class="no-focus q-mr-md" />
            <template>
                <main-header-separator />
                <main-header-account-select />
                <main-header-separator />
                <main-header-project-select />
                <!-- <button-action -->
                <!-- v-if="userProfileStore.currentProject !== null" -->
                <!-- class="q-ml-sm" -->
                <!-- icon="cogwheel" -->
                <!-- :attrs="{ color: 'grey-4', textColor: 'grey-9' }" -->
                <!-- label="global.labels.projectSettings" -->
                <!-- @click="handleClick" -->
                <!-- /> -->
                <q-space />
                <main-header-user />
                <main-header-separator />
                <main-header-language />
            </template>
        </q-toolbar>
    </q-header>
</template>

<script setup lang="ts">
import ButtonLogo from "src/components/ButtonLogo.vue";
import MainHeaderAccountSelect from "src/components/MainHeaderAccountSelect.vue";
import MainHeaderLanguage from "src/components/MainHeaderLanguage.vue";
import MainHeaderProjectSelect from "src/components/MainHeaderProjectSelect.vue";
import MainHeaderSeparator from "src/components/MainHeaderSeparator.vue";
import MainHeaderUser from "src/components/MainHeaderUser.vue";
</script>
