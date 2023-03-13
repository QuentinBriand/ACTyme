<template>
    <button-action
        class="text-subtitle2 text-weight-bold"
        icon="export"
        color="grey-3"
        textColor="grey-7"
        colorHover="gold"
        textColorHover="grey-1"
        :attrs="attrs"
        :label="label"
        @click="handleClickDownload"
    />
</template>

<script setup lang="ts">
import { exportFile, QBtnProps } from "quasar";
import ButtonAction from "src/components/ButtonAction.vue";
import { Matrix } from "src/types/Matrix";

const props = defineProps<{
    attrs?: QBtnProps;
    label: string;
    fileTitle: string;
    matrix: Matrix;
}>();

const handleClickDownload = async () => {
    exportFile(
        props.fileTitle + ".actrix",
        JSON.stringify(props.matrix),
        "json"
    );
};
</script>
