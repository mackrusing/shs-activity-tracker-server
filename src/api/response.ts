import { JsonEvent, JsonStudent } from "../types";

export class ApiResponse {
    success: boolean;
    message: string;
    data: Data;

    // constructors
    static error(message: string) {
        return new this(false, message, null);
    }

    static ok(data: Data) {
        return new this(true, "ok", data);
    }

    constructor(success: boolean, message: string, data: Data) {
        this.success = success;
        this.message = message;
        this.data = data;
    }
}

type Data = JsonStudent[] | JsonEvent[] | JsonStudent | JsonEvent | null;
