interface Builder<T> {
    tree: T;
    mutator?: (property: string) => string;
}
export const builder = <T extends object>({ tree, mutator }: Builder<T>) => {
    let xml = "";
    const dataTree = Object.entries(tree);
    dataTree.forEach((entry) => {
        const key = entry[0];
        const content = entry[1];
        xml += `<${mutator ? mutator(key) : key}>${
            typeof content === "object" ? builder({ tree: content, mutator }) : content
        }</${mutator ? mutator(key) : key}>`;
    });
    return xml;
};
