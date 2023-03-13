<template>
    <q-form class="col column gap-sm" @reset="onReset" @submit="onSubmit">
        <q-card class="col column q-pt-sm shadow-12 rounded-10">
            <q-card-section>
                <div class="row q-col-gutter-sm q-mt-lg">
                    <div class="col-4">
                        <form-fieldset
                            title="accountInfos.fields.mainContact.label"
                        >
                            <q-input
                                v-model="formData.displayName"
                                clearable
                                class="bg-grey-1"
                                standout="bg-grey-2"
                                :placeholder="
                                    $t('global.fields.fullName.label')
                                "
                            />
                            <q-input
                                v-model="formData.email"
                                clearable
                                class="bg-grey-1"
                                standout="bg-grey-2"
                                hide-bottom-space
                                :placeholder="$t('global.fields.email.label')"
                                :rules="[isRequired, isEmail]"
                            />
                        </form-fieldset>
                    </div>
                </div>
            </q-card-section>
            <form-details-footer />
        </q-card>
    </q-form>
</template>

<script setup lang="ts">
import FormDetailsFooter from "src/components/FormDetailsFooter.vue";
import FormFieldset from "src/components/FormFieldset.vue";
import { useForm } from "src/hooks/useForm";
import { isEmail, isRequired } from "src/hooks/useFormRules";
import { UserMeResponse } from "src/services/api/user-me.dto";
import { useUserProfileStore } from "src/stores/userProfile.store";
import { ref, watch } from "vue";

const userProfileStore = useUserProfileStore();
const user = ref(userProfileStore.user);

const { formData, onReset, onSubmit } = useForm({
    data: { ...user.value },
    handleSubmit: async formData => {
        await userProfileStore.updateUser(formData as UserMeResponse);
    },
    labels: {
        success: "account.notifications.updated",
    },
});
watch(
    () => userProfileStore.user,
    user => {
        formData.value = { ...user };
    },
    { immediate: true }
);
</script>
