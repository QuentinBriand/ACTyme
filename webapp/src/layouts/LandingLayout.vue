<template>
    <q-layout view="lHh lpR fFf" class="bg-grey-2">
        <landing-header />
        <q-page-container class="bg-white">
            <q-page class="grid-center mx-auto">
                <router-view />
            </q-page>
        </q-page-container>
        <landing-footer />
    </q-layout>
</template>

<script setup lang="ts">
import LandingHeader from "src/components/LandingHeader.vue";
import LandingFooter from "src/components/LandingFooter.vue";
</script>
