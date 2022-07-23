
<template>
    <q-card class="q-py-lg">
        <q-card-section class="q-py-none q-px-lg text-h5 text-center">
            {{ title }}
        </q-card-section>
        <slot />
    </q-card>
    <div v-if="mentions" v-html="mentions" class="q-mt-md text-caption text-grey-8" />
</template>

<script setup lang="ts">
defineProps({
    title: {
        type: String,
        required: true,
    },
    mentions: {
        type: String,
    },
});
</script>

<style lang="sass" scoped>
.q-card
    width: clamp(300px, 22vw ,400px)
</style>
