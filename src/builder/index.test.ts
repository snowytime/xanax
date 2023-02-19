import test from "ava";

import { builder } from "./index.js";

test("should return an empty string when the object is empty", (t) => {
    const object = {};
    const result = builder({ tree: object });
    t.is(result, "");
});
test("should be able to build a simple xml string", (t) => {
    const object = {
        root: {
            child: "value",
        },
    };
    const result = builder({ tree: object });
    t.is(result, "<root><child>value</child></root>");
});
test("should be able to build a complex xml string", (t) => {
    const object = {
        root: {
            child: "value",
            child2: "value2",
        },
    };
    const result = builder({ tree: object });
    t.is(result, "<root><child>value</child><child2>value2</child2></root>");
});
test("should be able to build a complex xml string with a mutator", (t) => {
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
    t.is(result, "<ROOT><CHILD>value</CHILD><CHILD2>value2</CHILD2></ROOT>");
});
test("should be able to build a complex xml string with a mutator and a nested object", (t) => {
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
    t.is(
        result,
        "<root something><child something>value</child something><child2 something>value2</child2 something></root something>",
    );
});
