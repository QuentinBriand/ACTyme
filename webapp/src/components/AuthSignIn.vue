<template>
    <auth-wrapper :title="$t('signIn.title')">
        <!-- <q-separator /> -->
        <!-- <auth-sign-in-external /> -->
        <!-- <q-separator /> -->
        <auth-sign-in-form />
    </auth-wrapper>
</template>

<script setup lang="ts">
import AuthSignInForm from "src/components/AuthSignInForm.vue";
import AuthWrapper from "src/components/AuthWrapper.vue";
</script>
