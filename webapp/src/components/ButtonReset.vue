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
    <q-btn
        flat
        class="bg-grey-2 text-caption text-weight-semibold cursor-pointer"
        padding="sm md"
        type="reset"
        :label="$t(label)"
    />
</template>

<script lang="ts" setup>
import { QBtnProps } from "quasar";
import { getQuasarVar } from "src/helpers/css.helper";

interface Props {
    color?: QBtnProps["color"];
    colorHover?: QBtnProps["color"];
    label: string;
}

withDefaults(defineProps<Props>(), {
    color: "grey-5",
    colorHover: "grey-7",
});
</script>

<style lang="sass" scoped>
.q-btn
    transition: all var(--speed-quick) var(--ease)
    color: v-bind('getQuasarVar(color)')

.q-btn:hover
    color: v-bind('getQuasarVar(colorHover)')
</style>
