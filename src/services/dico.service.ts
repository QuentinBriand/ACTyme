import translations from "src/assets/translations/en.json";
import get from "lodash/get";

export const t = (key: string) => get(translations, key) || key;

export const pluralize = (key: string, count: number) =>
    get(translations, `${key}.${count === 1 ? "singular" : "plural"}`) || key;
