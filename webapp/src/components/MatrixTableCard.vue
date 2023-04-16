<template>
    <q-card class="q-pa-md shadow-12">
        <q-card-section v-if="cell.type === 'cell'" class="row justify-between">
            <popup-button
                color="orange"
                :details="cell.criteria || []"
                icon="ads_click"
                tooltip="Evaluations"
                type="Evaluation"
            />

            <progress-button :cell="cell" />

            <popup-button
                color="blue"
                :details="cell.actions || []"
                icon="rule"
                tooltip="Actions"
                type="Action"
            />
        </q-card-section>
        <q-card-section
            v-else-if="cell.type === 'determinant'"
            class="row justify-between items-center"
        >
            <popup-edit-title
                :id="cell.id"
                :title="cell.title"
                @update:title="emit('update:detetminantTitle', $event, cell.id)"
            />
            <q-btn v-if="cell.last" round :ripple="false" @click="addCell">
                +
            </q-btn>
        </q-card-section>
        <q-card-section
            v-else-if="cell.type === 'success'"
            class="column justify-between items-center"
        >
            <popup-edit-title
                :id="cell.id"
                :title="cell.title"
                @update:title="emit('update:successTitle', $event, cell.id)"
            />
            <q-btn
                v-if="cell.last"
                class="q-mt-sm q-mb-none"
                round
                :ripple="false"
                @click="addCell"
            >
                +
            </q-btn>
        </q-card-section>
    </q-card>
</template>

<script setup lang="ts">
import { useMatrixStore } from "src/stores/matrix.store";
import { TableCell } from "src/types/TableCell";
import { provide } from "vue";
import PopupButton from "./PopupButton.vue";
import PopupEditTitle from "./PopupEditTitle.vue";
import ProgressButton from "./ProgressButton.vue";

const props = defineProps<{
    cell: TableCell;
}>();
const matrixStore = useMatrixStore();

// eslint-disable-next-line func-call-spacing
const emit = defineEmits<{
    (event: "update:detetminantTitle", title: string, id: number): void;
    (event: "update:successTitle", title: string, id: number): void;
}>();

const addCell = () => {
    if (props.cell.type === "determinant") {
        matrixStore.addEmptyDeterminantKey();
    } else if (props.cell.type === "success") {
        matrixStore.addEmptySuccessKey();
    }
};
provide("cell", props.cell);
</script>
