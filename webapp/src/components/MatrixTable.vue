<template>
    <div v-if="matrixStore._currentMatrix !== null">
        <div class="row justify-between">
            <span class="text-h3 cursor-pointer">
                {{ matrixStore._currentMatrix.title }}
                <q-popup-edit
                    v-model="matrixStore._currentMatrix.title"
                    v-slot="scope"
                >
                    <q-input
                        v-model="scope.value"
                        dense
                        autofocus
                        @keyup.enter="setTitle(scope)"
                    />
                </q-popup-edit>
            </span>
            <button-download
                label="Sauvegarder la matrice"
                :matrix="currentMatrix"
                :file-title="currentMatrix.title"
                mode="ACTRIX"
            />
            <button-download
                label="Télécharger les actions restantes en PDF"
                :matrix="currentMatrix"
                :file-title="currentMatrix.title"
                mode="PDF"
                :cells="tableCells"
            />
            <button-download
                label="Télécharger la matrice complète en PDF"
                :matrix="currentMatrix"
                :file-title="currentMatrix.title"
                mode="PDF FULL"
                :cells="tableCells"
            />
        </div>
        <div class="grid gap-md q-py-xl">
            <matrix-table-card
                v-for="cell in tableCells"
                :key="cell.id + cell.type"
                :cell="cell"
                @update:detetminant-title="
                    matrixStore.updateDeterminantKeyTitle(cell.id, $event)
                "
                @update:success-title="
                    matrixStore.updateSuccessKeyTitle(cell.id, $event)
                "
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import ButtonDownload from "src/components/ButtonDownload.vue";
import { useMatrixStore } from "src/stores/matrix.store";
import { Matrix } from "src/types/Matrix";
import { TableCell } from "src/types/TableCell";
import { computed } from "vue";
import MatrixTableCard from "./MatrixTableCard.vue";

const matrixStore = useMatrixStore();

const props = defineProps<{
    currentMatrix: Matrix;
}>();

const setTitle = (scope: any) => {
    if (scope.value !== "" && matrixStore._currentMatrix !== null) {
        matrixStore._currentMatrix.title = scope.value;
    } else {
        scope.set(matrixStore._currentMatrix?.title);
    }
};

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
