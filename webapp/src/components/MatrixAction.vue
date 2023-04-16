<template>
    <q-checkbox
        v-if="action.type == 'checkbox'"
        v-model="isChecked"
        @update:model-value="emit('update:checkbox', isChecked)"
    />
    <q-linear-progress
        v-else
        stripe
        rounded
        class="cursor-pointer"
        size="1.2rem"
        color="accent"
        :value="progress"
        @click="updateProgress()"
    >
        <div class="absolute-full flex flex-center">
            <q-badge
                color="white"
                text-color="accent"
                :label="formattedState"
            />
        </div>
    </q-linear-progress>
</template>

<script setup lang="ts">
import { MatrixAction, MatrixActionState } from "src/types/Matrix";
import { computed, ref } from "vue";

const props = defineProps<{
    action: MatrixAction;
}>();

// eslint-disable-next-line func-call-spacing
const emit = defineEmits<{
    (event: "update:checkbox", value: boolean): void;
    (event: "update:state", value: MatrixActionState): void;
}>();

const valueByStates: Record<MatrixActionState, number> = {
    notStarted: 0,
    inProgress: 0.5,
    done: 1,
};

const getProgress = (state: MatrixActionState | undefined) => {
    if (state === undefined) {
        return 0;
    }
    return valueByStates[state];
};

const isChecked = ref(props.action.checked!);
const progress = ref(getProgress(props.action.state));

const formattedState = computed(() => {
    if (props.action.state === undefined || props.action.state === "notStarted") {
        return "Pas encore commencé";
    }
    if (props.action.state === "inProgress") {
        return "En cours";
    }
    return "Terminé";
});

const updateProgress = () => {
    if (progress.value === 1) {
        progress.value = 0;
        emit("update:state", "notStarted");
        return;
    }
    progress.value = progress.value < 1.0 ? progress.value + 0.5 : 1;
    if (progress.value >= 1.0) {
        emit("update:state", "done");
    } else if (progress.value > 0.0) {
        emit("update:state", "inProgress");
    }
};
</script>
