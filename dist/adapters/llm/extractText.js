export function extractTextFromResponse(content) {
    return content
        .filter((block) => block.type === "text")
        .map((block) => block.text ?? "")
        .join("\n");
}
//# sourceMappingURL=extractText.js.map