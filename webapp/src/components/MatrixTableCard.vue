<template>
    <q-card class="q-pa-md">
        <q-card-section v-if="cell.type === 'cell'" class="row justify-between">
            <popup-button
                color="orange"
                :details="cell.criteria || []"
                icon="ads_click"
            />

            <progress-button />

            <popup-button
                color="blue"
                :details="cell.actions || []"
                icon="rule"
            />
        </q-card-section>
        <q-card-section v-else>
            {{ cell.title }}
        </q-card-section>
    </q-card>
</template>

<script setup lang="ts">
import { TableCell } from "src/types/TableCell";
import PopupButton from "./PopupButton.vue";
import ProgressButton from "./ProgressButton.vue";
defineProps<{
    cell: TableCell;
}>();
</script>
