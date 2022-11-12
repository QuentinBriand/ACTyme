<!--
/**
 * Copyright (c) 2022 - Indigen Solutions
 * Authors:
 *   - Jérôme CLERICO <jerome.clerico@indigen.com>
 *   - Antoine FRANKEL <antoine.frankel@indigen.com>
 *   - Anthony BUSNEL <anthony.busnel@indigen.com>
 * NOTICE: All information contained herein is, and remains
 * the property of Indigen Solutions and its suppliers,
 * if any.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Indigen Solutions.
 */
 -->
<template>
    <q-card class="q-pa-lg column gap-lg clamp-width-card shadow-12">
        <div class="text-h5 text-center">{{ title }}</div>
        <slot />
    </q-card>
    <!-- <auth-mentions /> -->
</template>

<script setup lang="ts">
// import AuthMentions from "src/components/AuthMentions.vue";

defineProps<{
    title: string;
}>();
</script>
