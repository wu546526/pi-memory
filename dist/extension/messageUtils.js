export function getUserMessageText(message) {
    if (message.role !== "user")
        return null;
    if (typeof message.content === "string")
        return message.content;
    return message.content
        .filter((block) => block.type === "text")
        .map((block) => block.text)
        .join("\n");
}
export function setUserMessageText(message, text) {
    if (message.role !== "user")
        return message;
    return { ...message, content: text };
}
export function findLastUserMessageIndex(messages) {
    return messages.findLastIndex((message) => message.role === "user");
}
//# sourceMappingURL=messageUtils.js.map