<template>
    <q-layout view="hHh lpR fFf">
        <header-unauthenticated />
        <q-page-container>
            <q-page class="content-center">
                <router-view />
            </q-page>
        </q-page-container>
        <footer-unauthenticated />
    </q-layout>
</template>

<script setup lang="ts">
import FooterUnauthenticated from "components/FooterUnauthenticated.vue";
import HeaderUnauthenticated from "components/HeaderUnauthenticated.vue";
</script>
