import { parser } from "./index.js";

describe("Testing the xml parser function", () => {
    it("should return an empty object when the xml is empty", () => {
        const xml = "";
        const result = parser({ xml });
        expect(result).to.deep.equals({});
    });
    it("should be able to parse a simple xml string", () => {
        const xml = "<root><child>value</child></root>";
        const result = parser({ xml });
        expect(result).to.deep.equals({
            root: {
                child: "value",
            },
        });
    });
    it("should be able to parse a complex xml string", () => {
        const xml = "<root><child>value</child><child2>value2</child2></root>";
        const result = parser({ xml });
        expect(result).to.deep.equals({
            root: {
                child: "value",
                child2: "value2",
            },
        });
    });
    it("should be able to parse a complex xml string with a mutator", () => {
        const xml = "<root><child>value</child><child2>value2</child2></root>";
        const result = parser({
            xml,
            mutator: (key) => {
                return key.toUpperCase();
            },
        });
        expect(result).to.deep.equals({
            ROOT: {
                CHILD: "value",
                CHILD2: "value2",
            },
        });
    });
    it("should be able to parse a complex xml string with a mutator and a nested object", () => {
        const xml = "<root><child>value</child><child2>value2</child2></root>";
        const result = parser({
            xml,
            mutator: (key) => {
                return `${key} something`;
            },
        });
        expect(result).to.deep.equals({
            "root something": {
                "child something": "value",
                "child2 something": "value2",
            },
        });
    });
});
