import test from "ava";

import { parser } from "./index.js";

test("should return an empty object when the xml is empty", (t) => {
    const xml = "";
    const result = parser({ xml });
    t.deepEqual(result, {});
});
test("should be able to parse a simple xml string", (t) => {
    const xml = "<root><child>value</child></root>";
    const result = parser({ xml });
    t.deepEqual(result, {
        root: {
            child: "value",
        },
    });
});
test("should be able to parse a complex xml string", (t) => {
    const xml = "<root><child>value</child><child2>value2</child2></root>";
    const result = parser({ xml });
    t.deepEqual(result, {
        root: {
            child: "value",
            child2: "value2",
        },
    });
});
test("should be able to parse a complex xml string with a mutator", (t) => {
    const xml = "<root><child>value</child><child2>value2</child2></root>";
    const result = parser({
        xml,
        mutator: (key) => {
            return key.toUpperCase();
        },
    });
    t.deepEqual(result, {
        ROOT: {
            CHILD: "value",
            CHILD2: "value2",
        },
    });
});
test("should be able to parse a complex xml string with a mutator and a nested object", (t) => {
    const xml = "<root><child>value</child><child2>value2</child2></root>";
    const result = parser({
        xml,
        mutator: (key) => {
            return `${key} something`;
        },
    });
    t.deepEqual(result, {
        "root something": {
            "child something": "value",
            "child2 something": "value2",
        },
    });
});
