<template>
    <q-dialog v-model="model">
        <q-card>
            <q-card-section class="row items-center q-pb-none">
                <span class="text-h5">
                    {{ props.title }}
                </span>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>
            <q-card-section>
                <div
                    v-for="(detail, index) in details"
                    :key="detail.id"
                    class="col"
                >
                    <q-list>
                        <list-element
                            :element="detail"
                            :is-criteria="type === 'Evaluation'"
                            :cell-id="cell.id"
                            @update:title="
                                (title, id) => updateTitle(title, id)
                            "
                            @update:state="
                                (state, id) => updateState(state, id)
                            "
                            @update:checkbox="
                                (checked, id) => updateCheckbox(checked, id)"
                        />
                        <q-separator
                            v-if="index !== details.length - 1"
                            spaced
                            inset
                        />
                    </q-list>
                </div>
            </q-card-section>
            <q-card-section class="item-center">
                <q-btn v-if="type === 'Evaluation'" @click="addElement()"
                    >Ajouter une évaluation</q-btn
                >
                <div v-else>
                    <q-btn @click="addElement('checkbox')"
                        >Ajouter une checkbox</q-btn
                    >
                    <q-btn @click="addElement('progress')"
                        >Ajouter un progress</q-btn
                    >
                </div>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { computed, inject } from "vue";
import {
    MatrixAction,
    MatrixActionState,
    MatrixActionType,
    MatrixCriteria,
} from "src/types/Matrix";
import ListElement from "src/components/ListElement.vue";
import { useMatrixStore } from "src/stores/matrix.store";
import { TableCell } from "src/types/TableCell";

const cell = inject<TableCell>("cell");

if (!cell) {
    throw new Error("Cell is not provided");
}

const props = defineProps<{
    modelValue: boolean;
    details: MatrixCriteria[] | MatrixAction[];
    title: string;
    type: "Evaluation" | "Action";
}>();

const emits = defineEmits(["update:modelValue", "update:otherModelValue"]);
const model = computed({
    get: () => props.modelValue,
    set: value => emits("update:modelValue", value),
});

const matrixStore = useMatrixStore();

const addElement = (type?: MatrixActionType) => {
    if (props.type === "Action") {
        matrixStore.addActionToCell(cell?.id, {
            id: cell.actions![cell.actions!.length - 1]?.id + 1 || 0,
            title: "Nouvelle action",
            type: type!,
            checked: false,
        });
    } else {
        matrixStore.addCriteriaToCell(cell?.id, {
            id: cell.criteria![cell.criteria!.length - 1]?.id + 1 || 0,
            title: "Nouveau critère",
            impactedActionsIds: [],
        });
    }
};

const updateTitle = (title: string, id: number) => {
    if (props.type === "Action") {
        matrixStore.updateCellActionTitle(cell?.id, id, title);
    } else {
        matrixStore.updateCellCriteriaTitle(cell?.id, id, title);
    }
};

const updateState = (state: MatrixActionState, id: number) => {
    matrixStore.updateCellActionState(state, cell?.id, id);
};

const updateCheckbox = (checked: boolean, id: number) => {
    matrixStore.updateCellActionCheckbox(checked, cell?.id, id);
};
</script>
