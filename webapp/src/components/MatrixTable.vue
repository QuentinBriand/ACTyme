<template>
    <div v-if="matrixStore._currentMatrix !== null">
        <span class="text-h3">{{ matrixStore._currentMatrix.title }}</span>
        <div class="grid gap-md">
            <matrix-table-card
                v-for="cell in tableCells"
                :key="cell.id"
                :cell="cell"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useMatrixStore } from "src/stores/matrix.store";
import { TableCell } from "src/types/TableCell";
import { computed } from "vue";
import MatrixTableCard from "./MatrixTableCard.vue";
const matrixStore = useMatrixStore();

if (matrixStore._currentMatrix === null) {
    throw new Error("Matrix is null");
}

const currentMatrix = matrixStore._currentMatrix;
const tableCells = computed(() => {
    const cells: TableCell[] = [{ id: 0, title: "", type: "header" }];
    currentMatrix.determinantsKeys.forEach(determinantsKey => {
        cells.push({
            id: determinantsKey.id,
            title: determinantsKey.title,
            type: "determinant",
        });
    });
    currentMatrix.cells.forEach((cell, index) => {
        if (index % currentMatrix.determinantsKeys.length === 0) {
            cells.push({
                id: currentMatrix.successKeys[
                    index / currentMatrix.determinantsKeys.length
                ].id,
                title: currentMatrix.successKeys[
                    index / currentMatrix.determinantsKeys.length
                ].title,
                type: "success",
            });
        }
        cells.push({
            id: cell.id,
            type: "cell",
            actions: cell.actions,
            criteria: cell.criteria,
        });
    });
    return cells;
});
</script>

<style scoped lang="sass">
.grid
    display: grid
    grid-template-columns: repeat(v-bind('matrixStore.matrixWidth'), 1fr)
</style>
