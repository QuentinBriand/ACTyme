<template>
    <q-btn :color="color" @click="openPopup = !openPopup">
        <q-icon :name="icon" size="3vw" />
        <q-tooltip>{{ tooltip }}</q-tooltip>
    </q-btn>
    <popup-details
        v-model="openPopup"
        :details="details"
        :title="tooltip"
        :type="type"
    />
</template>

<script setup lang="ts">
import { QBtnProps } from "quasar";
import { MatrixAction, MatrixCriteria } from "src/types/Matrix";
import { ref } from "vue";
import PopupDetails from "./PopupDetails.vue";

const openPopup = ref(false);

defineProps<{
    color: QBtnProps["color"];
    details: MatrixCriteria[] | MatrixAction[];
    icon: string;
    tooltip: string;
    type: "Evaluation" | "Action";
}>();
</script>
