<!--
/**
 * Copyright (c) 2022 - Indigen Solutions
 * Authors:
 *   - Jérôme CLERICO <jerome.clerico@indigen.com>
 *   - Antoine FRANKEL <antoine.frankel@indigen.com>
 *   - Anthony BUSNEL <anthony.busnel@indigen.com>
 * NOTICE: All information contained herein is, and remains
 * the property of Indigen Solutions and its suppliers,
 * if any.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Indigen Solutions.
 */
 -->
<template>
    <q-separator class="q-mt-auto" />
    <q-card-actions class="row justify-end q-pa-md">
        <button-reset label="global.fields.reset.label" />
        <button-submit
            label="global.fields.save.label"
            :attrs="{
                color: 'grey-8',
                textColor: 'white',
            }"
        />
    </q-card-actions>
</template>

<script setup lang="ts">
import ButtonReset from "src/components/ButtonReset.vue";
import ButtonSubmit from "src/components/ButtonSubmit.vue";
</script>
