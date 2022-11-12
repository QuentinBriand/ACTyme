<template>
    <q-btn
        v-bind="attrs"
        unelevated
        class="text-caption text-weight-semibold cursor-pointer"
        padding="sm md"
        type="submit"
        :label="label"
    />
</template>

<script lang="ts" setup>
import { QBtnProps } from "quasar";
import { getQuasarVar } from "src/helpers/css.helper";

interface Props {
    attrs: QBtnProps;
    color?: QBtnProps["color"];
    colorHover?: QBtnProps["color"];
    label?: string;
}

withDefaults(defineProps<Props>(), {
    color: "grey-8",
    colorHover: "dark",
});
</script>

<style lang="sass">
.q-btn
    transition: all var(--speed-quick) var(--ease)
    background-color: v-bind('getQuasarVar(color)')

.q-btn:hover
    background-color: v-bind('getQuasarVar(colorHover)')
</style>
