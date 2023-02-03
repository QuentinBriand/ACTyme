<template>
    <q-dialog v-model="model" ref="testRef">
        <q-card style="width: 700px; max-width: 80vw">
            <q-toolbar>
                <q-toolbar-title class="text-center">
                    {{ props.title }}
                </q-toolbar-title>
                <q-btn
                    flat
                    v-close-popup
                    round
                    dense
                    class="absolute-right"
                    style="padding-right: 0.75vw"
                    icon="close"
                />
            </q-toolbar>
            <q-card-section>
                <div
                    v-for="(detail, index) in details"
                    :key="detail.id"
                    class="col"
                >
                    <q-list>
                        <q-item clickable :v-ripple="model" style="padding: 0%">
                            <list-element
                                :detail="detail"
                                :is-criteria="isCriteria"
                                :goTo="goToAction"
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
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";
import { MatrixAction, MatrixCriteria } from "src/types/Matrix";
import ListElement from "src/components/ListElement.vue";

const props = defineProps<{
    modelValue: boolean;
    details: MatrixCriteria[] | MatrixAction[];
    title: string;
}>();

const emits = defineEmits(["update:modelValue", "update:otherModelValue"]);
const model = computed({
    get: () => props.modelValue,
    set: value => emits("update:modelValue", value),
});

const isCriteria = computed(() => {
    return !Object.prototype.hasOwnProperty.call(props.details[0], "type");
});

const goToAction = (action: number) => {
    model.value = false;
};
</script>

<style scoped lang="sass"></style>
