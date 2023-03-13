<template>
    <auth-wrapper :title="$t('passwordRequest.title')">
        <q-form @submit="onSubmit" class="column gap-lg" lazy-rules="ondemand">
            <q-input
                v-model="formData.email"
                hide-bottom-space
                outlined
                lazy-rules
                stack-label
                :label="$t('global.fields.email.label')"
                :rules="[isRequired, isEmail]"
            />
            <button-submit
                class="self-end"
                :attrs="{
                    textColor: 'white',
                    loading: formStatus === 'submitting',
                }"
                label="passwordRequest.fields.submit.label"
            />
        </q-form>
    </auth-wrapper>
</template>

<script setup lang="ts">
import AuthWrapper from "src/components/AuthWrapper.vue";
import ButtonSubmit from "src/components/ButtonSubmit.vue";
import { useApi } from "src/hooks/useApi";
import { useForm } from "src/hooks/useForm";
import { isEmail, isRequired } from "src/hooks/useFormRules";
import { PasswordRequestBodyDto } from "src/services/api/password-request.dto";

const api = useApi();

const { formData, formStatus, onSubmit } = useForm({
    data: {
        email: "",
    },
    handleSubmit: async ({ email }) => {
        const request: PasswordRequestBodyDto = {
            email,
        };
        await api.passwordRequest(request);
    },
    labels: {
        success: "passwordRequest.notifications.success",
    },
});
</script>
