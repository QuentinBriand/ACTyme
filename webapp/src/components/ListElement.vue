<template>
    <ul class="custom-ul">
        <li style="width: 90%">
            <ul style="padding-left: 0">
                <span class="underline-dotted">
                    {{ element.title }}
                    <q-popup-edit v-model="title" auto-save v-slot="scope">
                        <q-input
                            v-model="scope.value"
                            dense
                            autofocus
                            @update:model-value="
                                emit('update:title', scope.value, element.id)
                            "
                        />
                    </q-popup-edit>
                </span>
                <li v-if="!props.isCriteria" class="item-details">
                    <q-checkbox
                        v-model="checkboxValue"
                        v-if="(element as MatrixAction).type == 'checkbox'"
                    />
                    <q-linear-progress
                        v-else
                        clickable
                        style="
                            width: 100%;
                            margin-top: 12px;
                            margin-bottom: 12px;
                        "
                        stripe
                        rounded
                        size="25px"
                        color="accent"
                        :value="progress1"
                        @click="updateProgress()"
                    >
                        <div class="absolute-full flex flex-center">
                            <q-badge
                                color="white"
                                text-color="accent"
                                :label="formattedState()"
                            />
                        </div>
                    </q-linear-progress>
                </li>
            </ul>
        </li>
    </ul>
    <div class="list-linkings" v-if="props.isCriteria">
        <q-btn
            v-for="action in (props.element as MatrixCriteria).impactedActionsIds"
            :key="action"
            class="linkings"
            push
            color="blue"
            :label="action"
            @click="props.goTo(action)"
        />
    </div>
    <div class="list-linkings" v-else>
        <q-btn
            v-for="criteria in (props.element as MatrixAction).impactedCriteriaIds"
            :key="criteria"
            class="linkings"
            push
            color="orange"
            :label="criteria"
            @click="props.goTo(criteria)"
        />
    </div>
    <q-btn
        icon="close"
        flat
        round
        dense
        :ripple="false"
        class="no-focus"
        @click="emit('delete', element.id)"
    />
</template>

<script setup lang="ts">
import { defineProps, ref, watch } from "vue";
import { MatrixAction, MatrixCriteria } from "src/types/Matrix";

const props = defineProps<{
    element: MatrixCriteria | MatrixAction;
    isCriteria: boolean;
    // eslint-disable-next-line func-call-spacing
    goTo: (action: number) => void;
}>();

// eslint-disable-next-line func-call-spacing
const emit = defineEmits<{
    (event: "update:title", title: string, id: number): void;
    (event: "delete", id: number): void;
}>();

const title = ref(props.element.title);

const checkboxValue = ref((props.element as MatrixAction).checked);
watch(checkboxValue, value => {
    (props.element as MatrixAction).checked = value;
});

const progress1 = ref(0.0);
const stateValue = (props.element as MatrixAction).state;

switch (stateValue) {
    case "notStarted":
        progress1.value = 0.0;
        break;
    case "inProgress":
        progress1.value = 0.5;
        break;
    case "done":
        progress1.value = 1.0;
        break;
    default:
        progress1.value = 0.0;
        break;
}

const formattedState = () => {
    const state = (props.element as MatrixAction).state;
    if (state === undefined) return "Non défini";
    return state.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
        return str.toUpperCase();
    });
};

const updateProgress = () => {
    progress1.value = progress1.value < 1.0 ? progress1.value + 0.5 : 1;
    if (progress1.value > 0.0) {
        (props.element as MatrixAction).state = "inProgress";
    }
    if (progress1.value >= 1.0) {
        (props.element as MatrixAction).state = "done";
    }
};
</script>

<style scoped lang="sass">
ul
    list-style: none
.item-details
    padding-left: 1.0vw
    width: 100%
.custom-ul
    display: flex
    width: 100%
    justify-content: left
    align-items: center
    user-select: none
    padding-left: 0
.linkings
    margin-right: 0.2vw
.list-linkings
    display: flex
    justify-content: right
    align-items: center
    user-select: none
</style>
