import { deepClone, merge } from "./index";

describe("Object Utils", () => {
    describe("deepClone", () => {
        it("should clone object", () => {
            const obj = { a: 1, b: { c: 2 } };
            const cloned = deepClone(obj);
            expect(cloned).toEqual(obj);
            expect(cloned).not.toBe(obj);
            expect(cloned.b).not.toBe(obj.b);
        });
    });

    describe("merge", () => {
        it("should merge objects", () => {
            const obj1 = { a: 1, b: 2 };
            const obj2 = { b: 3, c: 4 };
            const merged = merge(obj1, obj2);
            expect(merged).toEqual({ a: 1, b: 3, c: 4 });
        });
    });
});
