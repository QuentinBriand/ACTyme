
<template>
    <auth-wrapper :mentions="t('signIn.mentions')" :title="t('signIn.title')">
        <auth-sign-in-form />
    </auth-wrapper>
</template>

<script setup lang="ts">
import AuthSignInForm from "src/components/AuthSignInForm.vue";
import AuthWrapper from "src/components/AuthWrapper.vue";
import { t } from "src/services/dico.service";
</script>
