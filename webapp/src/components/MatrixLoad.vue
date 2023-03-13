<template>
    <button-upload label="Ouvrir Matrice" @upload:matrix="upload" />
</template>

<script setup lang="ts">
import ButtonUpload from "src/components/ButtonUpload.vue";
import { useMatrixStore } from "src/stores/matrix.store";
import { Matrix } from "src/types/Matrix";

const matrixStore = useMatrixStore();

const upload = (matrix: Matrix) => {
    matrixStore.setMatrix(matrix);
};
</script>
