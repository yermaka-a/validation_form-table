class SendDataError extends Error {
    code: number | undefined;
    constructor(code: number | undefined, message: string | undefined) {
        super(message);
        this.name = "SendDataError";
        this.code = code;
    }
}

export default SendDataError;