export const getCSSVar = (name: string) => `var(--${name})`;

export const getQuasarVar = (name: string | undefined) =>
    name !== undefined ? getCSSVar(`q-${name}`) : "";

export const getQuasarVarWithVariant = (
    name = "white",
    variant?: string | number
) => getCSSVar(`q-${name}${variant ? `-${variant}` : ""}`);

export const getClassText = (variant: string) =>
    `text-${variant.toLowerCase()}`;

export const getColorVar = (name?: string | null, opacity = 1) => {
    if (name === undefined || name === null || name === "white") {
        return getCSSVar("q-white");
    }
    const colorName =
        name === "NA" || name === null ? "grey" : name.toLowerCase();
    return `rgba(${getCSSVar(`q-${colorName}`)}, ${opacity})`;
};
