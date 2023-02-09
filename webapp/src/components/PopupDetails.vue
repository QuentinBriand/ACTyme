<template>
    <q-dialog v-model="model" ref="testRef">
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
                        <q-item clickable :v-ripple="model" style="padding: 0%">
                            <list-element
                                :element="detail"
                                :is-criteria="type === 'Evaluation'"
                                :goTo="goToAction"
                                @update:title="
                                    (title, id) => updateTitle(title, id)
                                "
                            />
                        </q-item>
                        <q-separator
                            v-if="index !== details.length - 1"
                            spaced
                            inset
                        />
                    </q-list>
                </div>
            </q-card-section>
            <q-card-section class="item-center">
                <q-btn @click="addElement">Add</q-btn>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed, inject } from "vue";
import { MatrixAction, MatrixCriteria } from "src/types/Matrix";
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

const goToAction = (action: number) => {
    model.value = false;
};

const addElement = () => {
    if (props.type === "Action") {
        matrixStore.addActionToCell(cell?.id, {
            id: cell.actions![cell.actions!.length - 1]?.id + 1 || 0,
            title: "Nouvelle action",
            type: "checkbox",
            checked: false,
        });
    } else {
        matrixStore.addCriteriaToCell(0, {} as MatrixCriteria);
    }
};

const updateTitle = (title: string, id: number) => {
    if (props.type === "Action") {
        matrixStore.updateCellActionTitle(cell?.id, id, title);
    } else {
        // matrixStore.updateCriteriaTitle(id, title);
    }
};
</script>

<style scoped lang="sass"></style>
