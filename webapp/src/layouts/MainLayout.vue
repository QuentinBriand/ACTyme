<template>
    <q-layout view="lHh lpR fFf" class="bg-grey-2">
        <!-- <loading-page v-if="!authInitted" /> -->
        <template v-if="authInitted">
            <!-- <main-header /> -->
            <q-page-container>
                <div class="q-pt-md q-px-xl q-pb-xl">
                    <router-view :key="`${$route.params.matrixId}`" />
                </div>
            </q-page-container>
        </template>
    </q-layout>
</template>

<script setup lang="ts">
// import MainHeader from "src/components/MainHeader.vue";
// import LoadingPage from "src/pages/LoadingPage.vue";
import { useAuthStore } from "src/stores/auth.store";
import { toRef } from "vue";
import { useRoute } from "vue-router";

const authStore = useAuthStore();
const $route = useRoute();

const authInitted = toRef(authStore, "initted");
console.log(authInitted.value);

authStore.init();
</script>
