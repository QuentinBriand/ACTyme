<template>
    <q-form @submit="onSubmit" class="column gap-lg" lazy-rules="ondemand">
        <div class="column gap-sm">
            <q-input
                v-model="formData.email"
                hide-bottom-space
                outlined
                lazy-rules
                stack-label
                :label="$t('global.fields.email.label')"
                :rules="[isRequired, isEmail]"
            />
            <q-input
                v-model="formData.password"
                hide-bottom-space
                outlined
                lazy-rules
                stack-label
                type="password"
                :label="$t('global.fields.password.label')"
                :rules="[isRequired]"
            />
        </div>
        <div class="row no-wrap items-center justify-between gap-lg">
            <router-link
                class="text-grey-7 text-body2"
                :to="{ path: 'password-request' }"
            >
                {{ $t("signIn.requestPassword") }}
            </router-link>
            <button-submit
                :label="$t('signIn.fields.submit.label')"
                :attrs="{
                    textColor: 'white',
                    loading: formStatus === 'submitting',
                }"
            />
        </div>
    </q-form>
</template>

<script setup lang="ts">
import ButtonSubmit from "src/components/ButtonSubmit.vue";
import { useApi } from "src/hooks/useApi";
import { useForm } from "src/hooks/useForm";
import { isEmail, isRequired } from "src/hooks/useFormRules";
import { useNavigate } from "src/hooks/useNavigate";

const api = useApi();
const { goto } = useNavigate();

const { formData, formStatus, onSubmit } = useForm({
    data: {
        email: "",
        password: "",
    },
    handleSubmit: async ({ email, password }) => {
        await api.signIn(email, password);
        goto({
            name: "account.dashboard",
        });
    },
});
</script>
