<template>
    <matrix-table
        v-if="matrixStore._currentMatrix !== null"
        :current-matrix="matrixStore._currentMatrix"
    />
    <matrix-load v-else>LOAD</matrix-load>
</template>

<script setup lang="ts">
import MatrixTable from "src/components/MatrixTable.vue";
import MatrixLoad from "src/components/MatrixLoad.vue";
import { useMatrixStore } from "src/stores/matrix.store";

const matrixStore = useMatrixStore();
</script>
