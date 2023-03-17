<template>
    <matrix-table
        v-if="matrixStore._currentMatrix !== null"
        :current-matrix="matrixStore._currentMatrix"
    />
    <div v-else>
        <matrix-load />
        <button-action
            class="text-subtitle2 text-weight-bold q-mt-md"
            icon="export"
            color="grey-3"
            textColor="grey-7"
            colorHover="gold"
            textColorHover="grey-1"
            label="Charger une matrice basique"
            @click="matrixStore.setDefaultMatrix()"
        />
    </div>
</template>

<script setup lang="ts">
import MatrixTable from "src/components/MatrixTable.vue";
import MatrixLoad from "src/components/MatrixLoad.vue";
import ButtonAction from "src/components/ButtonAction.vue";
import { useMatrixStore } from "src/stores/matrix.store";

const matrixStore = useMatrixStore();
</script>
