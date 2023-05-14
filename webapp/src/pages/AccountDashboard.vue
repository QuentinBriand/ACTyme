<template>
    <div v-if="matrixStore._currentMatrix !== null">
        <matrix-table :current-matrix="matrixStore._currentMatrix" />
        <button-action
            class="text-subtitle2 text-weight-bold"
            icon="chat_bubble_outline"
            color="grey-3"
            textColor="grey-7"
            colorHover="gold"
            textColorHover="grey-1"
            label="Commentaires"
            no-separator
            @click="isOpen = true"
        />
        <q-dialog v-model="isOpen">
            <popup-comments :current-matrix="matrixStore._currentMatrix" />
        </q-dialog>
    </div>
    <div v-else>
        <matrix-load />
        <button-action
            class="text-subtitle2 text-weight-bold q-mt-md"
            icon="export"
            color="grey-3"
            textColor="grey-7"
            colorHover="gold"
            textColorHover="grey-1"
            label="Charger une matrice basique"
            @click="matrixStore.setDefaultMatrix()"
        />
    </div>
</template>

<script setup lang="ts">
import MatrixTable from "src/components/MatrixTable.vue";
import MatrixLoad from "src/components/MatrixLoad.vue";
import ButtonAction from "src/components/ButtonAction.vue";
import PopupComments from "src/components/PopupComments.vue";
import { useMatrixStore } from "src/stores/matrix.store";
import { ref } from "vue";

const matrixStore = useMatrixStore();
const isOpen = ref(false);
</script>
