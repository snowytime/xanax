interface Parser {
    xml: string;
    mutator?: (property: string) => string;
}
type GenericObject = Record<string, unknown>;
export const parser = ({ xml, mutator }: Parser) => {
    const jsonData: GenericObject = {};
    const matches = [
        ...xml
            .replace(/\n/g, " ")
            .matchAll(/(?:<(\w*)(?:\s[^>]*)*>)((?:(?!<\1).)*)(?:<\/\1>)|<(\w*)(?:\s*)*\/>/gm),
    ];
    if (matches.length === 0) return {};
    matches.forEach((result) => {
        const key = result[1] || result[3];
        const value = result[2] && parser({ xml: result[2], mutator });
        const resolvedValue = (value && Object.keys(value).length ? value : result[2]) || "";
        jsonData[mutator ? mutator(key) : key] = resolvedValue;
    });
    return jsonData;
};
