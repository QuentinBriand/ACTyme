<template>
    <matrix-table :current-matrix="matrixStore._currentMatrix!" />
</template>

<script setup lang="ts">
import MatrixTable from "src/components/MatrixTable.vue";
import { useMatrixStore } from "src/stores/matrix.store";
const matrixStore = useMatrixStore();
</script>
