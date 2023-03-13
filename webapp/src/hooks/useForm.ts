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
import cloneDeep from "lodash/cloneDeep";
import { useNotify } from "src/hooks/useNotify";
import { ref } from "vue";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IFormData = Record<string, any>;

type TFormStatus = "idle" | "submitting";

interface IFormProps {
    data: IFormData;
    handleSubmit: (data: IFormData) => Promise<void>;
    labels?: {
        success?: string;
    };
}
export const useForm = ({ data, handleSubmit, labels }: IFormProps) => {
    const { notifySuccess, notifyError } = useNotify();

    const formData = ref(cloneDeep(data));
    const formStatus = ref<TFormStatus>("idle");

    const onSubmit = async () => {
        try {
            formStatus.value = "submitting";
            await handleSubmit(formData.value);

            if (labels && labels.success) {
                notifySuccess(labels.success);
            }
        } catch (error) {
            notifyError(error);
            onReset();
        } finally {
            formStatus.value = "idle";
        }
    };

    const onReset = () => {
        formData.value = cloneDeep(data);
    };

    return { formData, formStatus, onSubmit, onReset };
};
