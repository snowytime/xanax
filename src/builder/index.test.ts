import { builder } from "./index.js";

describe("Testing the builder xml function", () => {
    it("should return an empty string when the object is empty", () => {
        const object = {};
        const result = builder({ tree: object });
        expect(result).equals("");
    });
    it("should be able to build a simple xml string", () => {
        const object = {
            root: {
                child: "value",
            },
        };
        const result = builder({ tree: object });
        expect(result).equals("<root><child>value</child></root>");
    });
    it("should be able to build a complex xml string", () => {
        const object = {
            root: {
                child: "value",
                child2: "value2",
            },
        };
        const result = builder({ tree: object });
        expect(result).equals("<root><child>value</child><child2>value2</child2></root>");
    });
    it("should be able to build a complex xml string with a mutator", () => {
        const object = {
            root: {
                child: "value",
                child2: "value2",
            },
        };
        const result = builder({
            tree: object,
            mutator: (key) => {
                return key.toUpperCase();
            },
        });
        expect(result).equals("<ROOT><CHILD>value</CHILD><CHILD2>value2</CHILD2></ROOT>");
    });
    it("should be able to build a complex xml string with a mutator and a nested object", () => {
        const object = {
            root: {
                child: "value",
                child2: "value2",
            },
        };
        const result = builder({
            tree: object,
            mutator: (key) => {
                return `${key} something`;
            },
        });
        expect(result).equals(
            "<root something><child something>value</child something><child2 something>value2</child2 something></root something>",
        );
    });
});
