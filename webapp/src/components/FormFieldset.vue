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
    <div class="column gap-sm">
        <template v-if="title">
            <div
                class="text-caption text-uppercase text-grey-6 text-weight-medium"
            >
                {{ $t(title) }}
            </div>
            <q-separator class="q-mt-xs q-mb-sm" />
        </template>
        <slot />
    </div>
</template>

<script setup lang="ts">
defineProps<{
    title: string;
}>();
</script>
