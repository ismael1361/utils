import { ColorValue, Color, HEX, HSL, RGB } from "./index";

export interface ColorVariant<T extends string = string> {
    name: T;
    hex: HEX;
    hsl: HSL;
    rgb: RGB;
}

export interface ColorPalette {
    "50": ColorVariant<"50">;
    "100": ColorVariant<"100">;
    "200": ColorVariant<"200">;
    "300": ColorVariant<"300">;
    "400": ColorVariant<"400">;
    "500": ColorVariant<"500">;
    "600": ColorVariant<"600">;
    "700": ColorVariant<"700">;
    "800": ColorVariant<"800">;
    "900": ColorVariant<"900">;
    A100: ColorVariant<"A100">;
    A200: ColorVariant<"A200">;
    A400: ColorVariant<"A400">;
    A700: ColorVariant<"A700">;
}

const generatePalette = (value: ColorValue): ColorPalette => {
    const color = new Color(value);
    const { h, s, l } = color.hsl;

    // Definir os ajustes de lightness e saturation para cada variante
    const mainVariants = [
        { name: "50" as const, lightness: 96, saturation: Math.min(s + 13, 100) },
        { name: "100" as const, lightness: 90, saturation: Math.min(s + 13, 100) },
        { name: "200" as const, lightness: 80, saturation: Math.min(s, 100) },
        { name: "300" as const, lightness: 70, saturation: Math.min(s - 10, 100) },
        { name: "400" as const, lightness: 62, saturation: Math.min(s - 6, 100) },
        { name: "500" as const, lightness: l, saturation: s },
        { name: "600" as const, lightness: Math.max(l - 4, 0), saturation: Math.min(s - 7, 100) },
        { name: "700" as const, lightness: Math.max(l - 11, 0), saturation: Math.min(s - 13, 100) },
        { name: "800" as const, lightness: Math.max(l - 16, 0), saturation: Math.min(s - 13, 100) },
        { name: "900" as const, lightness: Math.max(l - 19, 0), saturation: Math.min(s - 18, 100) },
    ];

    const accentVariants = [
        { name: "A100" as const, lightness: 75, saturation: 100 },
        { name: "A200" as const, lightness: 65, saturation: 100 },
        { name: "A400" as const, lightness: 54, saturation: 100 },
        { name: "A700" as const, lightness: 42, saturation: 100 },
    ];

    const palette: Partial<Record<keyof ColorPalette, ColorVariant<keyof ColorPalette>>> = {};

    // Gerar cores principais
    mainVariants.forEach((variant) => {
        const variantHsl = { h, s: variant.saturation, l: variant.lightness };
        const color = Color.fromHsl(variantHsl.h, variantHsl.s, variantHsl.l);
        palette[variant.name] = {
            name: variant.name,
            hex: color.hex,
            hsl: color.hsl,
            rgb: color.rgb,
        };
    });

    // Gerar cores de acento
    accentVariants.forEach((variant) => {
        const variantHsl = { h, s: variant.saturation, l: variant.lightness };
        const color = Color.fromHsl(variantHsl.h, variantHsl.s, variantHsl.l);
        palette[variant.name] = {
            name: variant.name,
            hex: color.hex,
            hsl: color.hsl,
            rgb: color.rgb,
        };
    });

    return palette as ColorPalette;
};

export default generatePalette;
