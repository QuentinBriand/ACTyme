<template>
    <div v-if="matrixStore._currentMatrix !== null">
        <span class="text-h3">{{ matrixStore._currentMatrix.title }}</span>
        <div class="grid gap-md q-py-xl">
            <matrix-table-card
                v-for="cell in tableCells"
                :key="cell.id + cell.type"
                :cell="cell"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useMatrixStore } from "src/stores/matrix.store";
import { Matrix } from "src/types/Matrix";
import { TableCell } from "src/types/TableCell";
import { computed } from "vue";
import MatrixTableCard from "./MatrixTableCard.vue";
const matrixStore = useMatrixStore();

const props = defineProps<{
    currentMatrix: Matrix;
}>();

const tableCells = computed(() => {
    let lastSuccessKey = 0;
    const cells: TableCell[] = [{ id: 0, title: "", type: "header" }];
    props.currentMatrix.determinantsKeys.forEach((determinantsKey, index) => {
        cells.push({
            id: determinantsKey.id,
            title: determinantsKey.title,
            type: "determinant",
            last: index === props.currentMatrix.determinantsKeys.length - 1,
        });
    });
    props.currentMatrix.cells.forEach((cell, index) => {
        if (index % props.currentMatrix.determinantsKeys.length === 0) {
            cells.push({
                id: props.currentMatrix.successKeys[
                    index / props.currentMatrix.determinantsKeys.length
                ].id,
                title: props.currentMatrix.successKeys[
                    index / props.currentMatrix.determinantsKeys.length
                ].title,
                type: "success",
                last:
                    lastSuccessKey ===
                    props.currentMatrix.successKeys.length - 1,
            });
            lastSuccessKey++;
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