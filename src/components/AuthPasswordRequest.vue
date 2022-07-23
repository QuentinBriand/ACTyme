
<template>
    <auth-wrapper title="Password request">
        <q-card-section class="q-mt-sm q-px-lg">
            <q-form @submit="onSubmit" class="column q-gutter-y-sm" lazy-rules="ondemand">
                <q-input
                    v-model="email"
                    filled
                    lazy-rules
                    label="Email"
                    :rules="[isRequired, isEmail]"
                />
                <q-btn
                    color="primary"
                    class="q-mt-md self-end"
                    type="submit"
                    label="Submit"
                />
            </q-form>
        </q-card-section>
    </auth-wrapper>
</template>

<script setup lang="ts">
import { useQuasar } from "quasar";
import { isEmail, isRequired } from "src/hooks/useFormRules";
import { ref } from "vue";
import AuthWrapper from "./AuthWrapper.vue";

const $q = useQuasar();

const email = ref("");

const onSubmit = async () => {
    try {
        // await api
    } catch (error) {
        if (error instanceof Error) {
            $q.notify({ message: error.message, type: "negative" });
        }
    }
};
</script>
