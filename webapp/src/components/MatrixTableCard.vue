<template>
    <q-card class="q-pa-sm shadow-12">
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
            class="justify-between items-center"
        >
            <div>
                <popup-edit-title
                    :id="cell.id"
                    :title="cell.title"
                    @update:title="emit('update:successTitle', $event, cell.id)"
                />
                <q-btn
                    v-if="cell.last"
                    round
                    :ripple="false"
                    @click="addCell"
                    icon="add"
                />
            </div>
        </q-card-section>
        <q-btn
            v-if="cell.type !== 'cell' && cell.type !== 'header'"
            class="top-left"
            size="sm"
            flat
            :ripple="false"
            icon="delete_outline"
            @click="isOpen = true"
        />
    </q-card>
    <q-dialog v-model="isOpen" persistent>
        <q-card>
            <q-card-section class="text-h6">Êtes vous sûr ?</q-card-section>
            <q-card-actions align="right">
                <q-btn flat color="primary" label="Annuler" v-close-popup />
                <q-btn flat color="primary" label="Supprimer" @click="deleteCell" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { useMatrixStore } from "src/stores/matrix.store";
import { TableCell } from "src/types/TableCell";
import { provide, ref } from "vue";
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

const isOpen = ref(false);

const addCell = () => {
    if (props.cell.type === "determinant") {
        matrixStore.addEmptyDeterminantKey();
    } else if (props.cell.type === "success") {
        matrixStore.addEmptySuccessKey();
    }
};

const deleteCell = () => {
    if (props.cell.type === "determinant") {
        matrixStore.deleteDeterminantKey(props.cell.id);
    } else if (props.cell.type === "success") {
        matrixStore.deleteSuccessKey(props.cell.id);
    }
};

provide("cell", props.cell);
</script>

<style lang="sass" scoped>
.top-left
    position: absolute
    top: 0
    left: -10px
    z-index: 1
</style>
