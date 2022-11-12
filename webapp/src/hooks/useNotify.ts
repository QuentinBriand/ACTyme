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

import { useQuasar } from "quasar";
import { useI18n } from "vue-i18n";

export const useNotify = () => {
    const $q = useQuasar();
    const $t = useI18n().t;

    const notifyError = (error: unknown) => {
        if (error instanceof Error) {
            notifyErrorMessage(error.message);
        }
    };
    const notifyErrorMessage = (message: string) => {
        $q.notify({ message: $t(message), type: "negative" });
    };

    const notifySuccess = (messageKey: string) => {
        notifySuccessMessage($t(messageKey));
    };
    const notifySuccessMessage = (message: string) => {
        $q.notify({ message, type: "positive" });
    };

    return {
        notifyError,
        notifyErrorMessage,
        notifySuccess,
        notifySuccessMessage,
    };
};
