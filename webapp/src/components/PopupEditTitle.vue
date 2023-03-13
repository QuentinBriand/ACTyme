<template>
    <span>
        {{ titleRef }}
        <q-popup-edit v-model="titleRef" auto-save v-slot="scope">
            <q-input
                v-model="scope.value"
                dense
                autofocus
                @keyup.enter="scope.set"
                @update:model-value="emit('update:title', scope.value, id)"
            />
        </q-popup-edit>
    </span>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
    title: string | undefined;
    id: number;
}>();

const titleRef = ref(props.title);

// eslint-disable-next-line func-call-spacing
const emit = defineEmits<{
    (event: "update:title", title: string, id: number): void;
}>();
</script>
