<template>
    <div class="row items-center col">
        <div class="col-12">
            <span class="underline-dotted cursor-pointer text-weight-medium">
                {{ element.title }}
                <q-popup-edit v-model="title" auto-save v-slot="scope">
                    <q-input
                        v-model="scope.value"
                        dense
                        autofocus
                        @keyup.enter="scope.set"
                        @update:model-value="
                            emit('update:title', scope.value, element.id)
                        "
                    />
                </q-popup-edit>
            </span>
            <matrix-action-component
                v-if="!props.isCriteria"
                :action="element as MatrixAction"
                @update:state="updateState($event)"
                @update:checkbox="updateCheckbox($event)"
            />
        </div>
        <span class="q-mt-md text-grey-7">
            {{ `${!isCriteria ? "Évaluations" : "Action"} liées :` }}</span
        >
        <q-select
            class="item-aligned"
            v-model="linkedElements"
            dense
            hide-bottom-space
            color="red"
            standout
            multiple
            :options="getOptions()"
            @update:model-value="setLinkedElements"
        >
            <template #selected-item="scope">
                <q-chip
                    removable
                    dense
                    @remove="scope.removeAtIndex(scope.index)"
                    :tabindex="scope.tabindex"
                    color="white"
                    text-color="red"
                    class="q-ma-none"
                >
                    {{ scope.opt }}
                    <q-tooltip> {{ getTitle(scope.opt - 1) }} </q-tooltip>
                </q-chip>
            </template>
        </q-select>
    </div>
</template>

<script setup lang="ts">
import MatrixActionComponent from "src/components/MatrixAction.vue";
import { useMatrixStore } from "src/stores/matrix.store";
import {
    MatrixAction,
    MatrixActionState,
    MatrixCriteria,
} from "src/types/Matrix";
import { TableCell } from "src/types/TableCell";
import { inject, ref } from "vue";

const matrixStore = useMatrixStore();

const cell = inject<TableCell>("cell");

if (cell === undefined) {
    throw new Error("Cell is undefined");
}

const props = defineProps<{
    element: MatrixCriteria | MatrixAction;
    isCriteria: boolean;
    cellId: number;
}>();

// eslint-disable-next-line func-call-spacing
const emit = defineEmits<{
    (event: "update:title", title: string, id: number): void;
    (event: "update:state", value: MatrixActionState, id: number): void;
    (event: "update:checkbox", value: boolean, id: number): void;
    (event: "delete", id: number): void;
}>();

const title = ref(props.element.title);

const getTitle = (id: number) => {
    if (props.isCriteria) {
        return cell.actions?.find(action => action.id === id)?.title;
    }
    return cell.criteria?.find(criteria => criteria.id === id)?.title;
};

const getLinkedElements = () => {
    if (props.isCriteria) {
        return (props.element as MatrixCriteria).impactedActionsIds?.map(
            id => id + 1
        );
    }
    return (props.element as MatrixAction).impactedCriteriaIds?.map(
        id => id + 1
    );
};

const linkedElements = ref(getLinkedElements());

const getOptions = () => {
    const cell = matrixStore._currentMatrix!.cells.find(
        cell => cell.id === props.cellId
    );
    if (cell === undefined) {
        return [];
    }
    if (props.isCriteria) {
        return cell.actions?.map(action => action.id) || [];
    }
    return cell.criteria?.map(criteria => criteria.id) || [];
};

const setLinkedElements = () => {
    if (props.isCriteria) {
        matrixStore.setLinkedActions(
            linkedElements.value || [],
            props.cellId,
            props.element.id
        );
    } else {
        matrixStore.setLinkedCriteria(
            linkedElements.value || [],
            props.cellId,
            props.element.id
        );
    }
};

const updateState = (state: MatrixActionState) => {
    emit("update:state", state, props.element.id);
};

const updateCheckbox = (checked: boolean) => {
    emit("update:checkbox", checked, props.element.id);
};
</script>
