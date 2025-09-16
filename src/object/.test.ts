import { deepClone, deepEqual, merge, setKeyValue, getKeyValue, removeKeys } from "./index";

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

	describe("deepEqual", () => {
		it("should compare objects", () => {
			const obj1 = { a: 1, b: { c: 2 } };
			const obj2 = { a: 1, b: { c: 2 } };
			const obj3 = { a: 1, b: { c: 3 } };
			expect(deepEqual(obj1, obj2)).toBe(true);
			expect(deepEqual(obj1, obj3)).toBe(false);
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

	describe("dot-notation", () => {
		it("should set and get value using dot-notation", () => {
			const obj = { a: 1, b: { c: 2 } };
			const key = "b.c";
			const value = 3;
			setKeyValue(obj, key, value);
			expect(getKeyValue(obj, key)).toBe(value);
		});

		it("should remove keys", () => {
			const obj = { a: 1, b: { c: 2 } };
			const keys = ["b.c", "a"];
			const expected = {};
			const result = removeKeys(obj, keys);
			expect(result).toEqual(expected);
		});
	});
});
