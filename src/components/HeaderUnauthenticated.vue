<template>
    <q-header
        class="row justify-center items-center gap-sm q-pa-xl bg-white text-dark cursor-pointer"
        @click="navigate('home')"
    >
        <the-logo />
        <p class="no-margin no-border transparent text-weight-bold text-h6">Things Recon</p>
    </q-header>
</template>

<script setup lang="ts">
import TheLogo from "components/TheLogo.vue";
import { useNavigate } from "src/hooks/useNavigate";
const { navigate } = useNavigate();
</script>
