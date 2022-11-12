export const getCSSVar = (name: string) => `var(--${name})`;

export const getQuasarVar = (name: string | undefined) =>
    name !== undefined ? getCSSVar(`q-${name}`) : "";

export const getQuasarVarWithVariant = (
    name: string,
    variant?: string | number
) => getCSSVar(`q-${name}${variant ? `-${variant}` : ""}`);

export const getClassText = (variant: string) =>
    `text-${variant.toLowerCase()}`;

export const getColorVar = (name = "white", opacity = 1) => {
    const colorName = name === "NA" ? "grey" : name.toLowerCase();
    return `rgba(${getCSSVar(`q-${colorName}`)}, ${opacity})`;
};
