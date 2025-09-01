import { capitalize, slugify } from "./index";

describe("String Utils", () => {
    describe("capitalize", () => {
        it("should capitalize string", () => {
            const str = "hello world";
            const capitalized = capitalize(str);
            expect(capitalized).toBe("Hello world");
        });
    });

    describe("slugify", () => {
        it("should slugify string", () => {
            const str = "Hello World!";
            const slugified = slugify(str);
            expect(slugified).toBe("hello-world");
        });
    });
});
