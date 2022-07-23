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

export const isRequired = (val: string) => {
    if (val === null || val === "") {
        return "Field is required";
    }
    return true;
};

export const isEmail = (val: string) => {
    const emailPattern =
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
    return emailPattern.test(val) || "Invalid email";
};

export const isPhoneNumber = (val: string) => {
    const phonePattern =
        /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/;
    return phonePattern.test(val) || "Invalid phone number";
};
