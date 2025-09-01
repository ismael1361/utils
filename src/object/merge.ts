export function merge<T extends object, U extends object>(target: T, source: U): T & U {
    const result = { ...target } as T & U;

    for (const key in source) {
        if (source.hasOwnProperty(key)) {
            const sourceValue = source[key];
            const targetValue = target[key as unknown as keyof T];

            if (typeof sourceValue === "object" && sourceValue !== null && typeof targetValue === "object" && targetValue !== null) {
                result[key as unknown as keyof T] = merge(targetValue, sourceValue) as any;
            } else {
                result[key as unknown as keyof T] = sourceValue as any;
            }
        }
    }

    return result;
}
