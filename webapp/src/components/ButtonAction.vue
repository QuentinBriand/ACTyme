<template>
    <q-btn
        unelevated
        class="no-padding cursor-pointer"
        :ripple="false"
        v-bind="attrs"
    >
        <span
            class="q-py-xs q-pl-md text-caption text-weight-semibold"
            :class="{ 'q-pr-md': !noSeparator }"
        >
            <!-- {{ $t(label, labelVars) }} -->
            {{ label }}
        </span>
        <q-separator v-if="!noSeparator" class="opacity-50" vertical />
        <q-icon
            class="q-pr-sm q-mr-xs"
            :class="{ 'q-pl-md': !noSeparator }"
            :name="`svguse:/icons.svg#${icon}|0 0 18 18`"
            :size="`${iconSize}px`"
        />
    </q-btn>
</template>

<script lang="ts" setup>
import { QBtnProps } from "quasar";
import { getQuasarVar } from "src/helpers/css.helper";

interface buttonsActionProps {
    attrs?: QBtnProps;
    color?: QBtnProps["color"];
    colorHover?: QBtnProps["color"];
    textColor?: QBtnProps["color"];
    textColorHover?: QBtnProps["color"];
    icon: string;
    iconSize?: number;
    label: string;
    labelVars?: any;
    noSeparator?: boolean;
}
withDefaults(defineProps<buttonsActionProps>(), {
    color: "primary",
    colorHover: "primary",
    iconSize: 18,
    textColor: "white",
    textColorHover: "white",
    variables: {},
});
</script>

<style lang="sass" scoped>
.q-btn
    transition: all var(--speed-quick) var(--ease)
    background-color: v-bind('getQuasarVar(color)')
    color: v-bind('getQuasarVar(textColor)')

.q-separator
    transition: all var(--speed-quick) var(--ease)

.q-btn:hover
    background-color: v-bind('getQuasarVar(colorHover)')
    color: v-bind('getQuasarVar(textColorHover)')

.q-separator
    background-color: v-bind('getQuasarVar(textColor)')
    opacity: 0.10

.q-btn:hover .q-separator
    background-color: v-bind('getQuasarVar(textColorHover)')
    opacity: 0.25
</style>
