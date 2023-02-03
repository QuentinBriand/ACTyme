<template>
    <q-circular-progress
        :value="getActionsPercentage([])"
        :min="0"
        :max="1"
        size="2.5rem"
        color="orange"
        class="container"
        :thickness="0.2"
        reverse
    />
    <q-circular-progress
        :value="getCriteriaPercentage([])"
        :min="0"
        :max="1"
        size="3.5rem"
        color="blue"
        class="container"
        :thickness="0.15"
    />
</template>

<script setup lang="ts">
import {
    getActionsPercentage,
    getCriteriaPercentage,
} from "src/helpers/matrix.helper";
</script>

<style scope lang="sass">
.container
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
</style>

<!-- <div class="button-progess">
                    <div>
                        <a style="color: orange; font-size: 1vw">
                            {{
                                Math.floor(
                                    getCriteriaPercentage(
                                        matrixStore._currentMatrix.cells[
                                            card.id - 1
                                        ].criteria,
                                        card.id
                                    ) * 100
                                )
                            }}%
                        </a>
                    </div>
                    <div>
                        <a style="color: #52a2da; font-size: 1vw">
                            {{
                                Math.floor(
                                    getActionsPercentage(
                                        matrixStore._currentMatrix.cells[
                                            card.id - 1
                                        ].actions
                                    ) * 100
                                )
                            }}%
                        </a>
                    </div>
                </div>
                <div class="button-progess">
                    <q-circular-progress
                        rounded
                        :value="
                            getActionsPercentage(
                                matrixStore._currentMatrix.cells[card.id - 1]
                                    .actions
                            )
                        "
                        size="6vw"
                        :thickness="0.22"
                        color="blue"
                        reverse
                        :min="0"
                        :max="1"
                        track-color="grey-3"
                        class="q-ma-md"
                    />
                </div>
                <div class="button-progess">
                    <q-circular-progress
                        rounded
                        :value="
                            getCriteriaPercentage(
                                matrixStore._currentMatrix.cells[card.id - 1]
                                    .criteria,
                                card.id
                            )
                        "
                        size="7.5vw"
                        :thickness="0.16"
                        color="orange"
                        reverse
                        :min="0"
                        :max="1"
                        track-color="grey-3"
                        class="q-ma-md"
                    />
                </div>
            </q-card-section>
            <q-card-section style="height: 100%" v-else>
                <div class="centered-text" style="width: 100%">
                    <p>
                        {{ card.title }}
                    </p>
                </div> -->
