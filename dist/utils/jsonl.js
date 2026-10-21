/** Incremental JSONL (one JSON object per line) framing for UDS IPC and queue files. */
export class JsonlFramer {
    buffer = "";
    push(chunk) {
        this.buffer += chunk;
        const lines = [];
        let idx;
        while ((idx = this.buffer.indexOf("\n")) !== -1) {
            const line = this.buffer.slice(0, idx);
            this.buffer = this.buffer.slice(idx + 1);
            if (line.trim())
                lines.push(line);
        }
        return lines;
    }
    reset() {
        this.buffer = "";
    }
}
export function serializeJsonlFrame(value) {
    return `${JSON.stringify(value)}\n`;
}
export function parseJsonlLine(line) {
    return JSON.parse(line);
}
//# sourceMappingURL=jsonl.js.map