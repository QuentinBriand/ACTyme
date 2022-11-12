/*
 * Copyright (c) 2022 - Indigen Solutions
 * Authors:
 *   - Jérôme CLERICO <jerome.clerico@indigen.com>
 * NOTICE: All information contained herein is, and remains
 * the property of Indigen Solutions and its suppliers,
 * if any.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Indigen Solutions.
 */

export type Role = "admin" | "contributor" | "reader";

export const ROLES: Role[] = ["reader", "contributor", "admin"];
