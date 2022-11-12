export interface ActymeErrorData {
    name: string;
    message?: string;
    args?: string[];
}

export class ActymeError extends Error {
    constructor(public readonly data: ActymeErrorData) {
        super(data.message || `error name="${data.name}"`);
    }
}
