
<template>
    <auth-wrapper :title="t('passwordReset.title')">
        <q-card-section class="q-mt-sm q-px-lg">
            <q-form @submit="onSubmit" class="column q-gutter-y-sm" lazy-rules="ondemand">
                <q-input
                    v-model="password"
                    filled
                    lazy-rules
                    required
                    type="password"
                    :label="t('global.fields.password.label')"
                    :placeholder="t('passwordReset.fields.password.placeholder')"
                />
                <q-input
                    v-model="passwordConfirm"
                    filled
                    lazy-rules
                    required
                    :label="t('passwordReset.fields.passwordConfirm.label')"
                    type="password"
                    :placeholder="t('passwordReset.fields.passwordConfirm.label')"
                />
                <q-btn
                    color="primary"
                    class="q-mt-md self-end"
                    type="submit"
                    :label="t('passwordReset.fields.submit.label')"
                />
            </q-form>
        </q-card-section>
    </auth-wrapper>
</template>

<script setup lang="ts">
import { useQuasar } from "quasar";
import { useNavigate } from "src/hooks/useNavigate";
import { t } from "src/services/dico.service";
import { ref } from "vue";
import AuthWrapper from "./AuthWrapper.vue";

const $q = useQuasar();
const { navigate, getQueryParam } = useNavigate();

const password = ref("");
const passwordConfirm = ref("");

const token = getQueryParam("token") || "";

if (token === "") {
    navigate("passwordRequest");
}

const onSubmit = async () => {
    if (password.value !== passwordConfirm.value) {
        $q.notify({
            message: t("errors.passwordMismatching"),
            type: "negative",
        });
        return;
    }

    try {
        // await api.passwordReset(token as string, password.value);
    } catch (error) {
        if (error instanceof Error) {
            $q.notify({ message: error.message, type: "negative" });
        }
    }
};
</script>
