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
            use-chips
            :options="getOptions()"
            @update:model-value="setLinkedElements"
        />
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
import { ref } from "vue";

const matrixStore = useMatrixStore();

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

const getLinkedElements = () => {
    if (props.isCriteria) {
        return (props.element as MatrixCriteria).impactedActionsIds;
    }
    return (props.element as MatrixAction).impactedCriteriaIds;
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
