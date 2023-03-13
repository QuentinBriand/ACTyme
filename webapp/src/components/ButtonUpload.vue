<template>
    <q-file
        v-model="file"
        v-bind="attrs"
        bgColor="grey-3"
        textColor="grey-7"
        colorHover="gold"
        textColorHover="grey-1"
        :label="label"
        class="text-subtitle2 text-weight-bold"
        accept=".actrix"
        standout
        @update:modelValue="handleFileUpdate"
    />
</template>

<script setup lang="ts">
import { QFileProps } from "quasar";
import { Matrix } from "src/types/Matrix";
import { ref } from "vue";

defineProps<{
    attrs?: QFileProps;
    label: string;
}>();

const file = ref(null);

// eslint-disable-next-line func-call-spacing
const emit = defineEmits<{
    (event: "upload:matrix", value: Matrix): void;
}>();

const handleFileUpdate = async (file: File) => {
    const content = await readFileAsync(file);
    emit("upload:matrix", JSON.parse(content));
};

const readFileAsync = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result as string);
        };
        reader.onerror = reject;
        reader.readAsText(file);
    });
</script>
