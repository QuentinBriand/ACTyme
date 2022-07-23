
<template>
    <q-card-section class="q-mt-sm q-px-lg">
        <q-form @submit="onSubmit" class="q-gutter-y-sm" lazy-rules="ondemand">
            <q-input
                v-model="email"
                filled
                lazy-rules
                :label="t('global.fields.email.label')"
                :rules="[isRequired, isEmail]"
            />
            <q-input
                v-model="password"
                filled
                lazy-rules
                type="password"
                :label="t('global.fields.password.label')"
                :rules="[isRequired]"
            />
            <div class="row no-wrap items-center justify-between gap-lg q-mt-md">
                <router-link class="text-grey-8" :to="{ name: 'passwordRequest' }">
                    {{ t("signIn.requestPassword") }}
                </router-link>
                <q-btn
                    color="primary"
                    type="submit"
                    :label="t('signIn.fields.submit.label')"
                    :loading="submitting"
                />
            </div>
        </q-form>
    </q-card-section>
</template>

<script setup lang="ts">
import { isEmail, isRequired } from "src/hooks/useFormRules";
import { useNavigate } from "src/hooks/useNavigate";
import { useNotify } from "src/hooks/useNotify";
import { t } from "src/services/dico.service";
import { ref } from "vue";

const { navigate } = useNavigate();
const { notifyError } = useNotify();

const email = ref("");
const password = ref("");
const submitting = ref(false);

const onSubmit = async () => {
    try {
        submitting.value = true;
        // await api.signIn(email.value, password.value);
        navigate("home");
    } catch (error) {
        notifyError(error);
    } finally {
        submitting.value = false;
    }
};
</script>
