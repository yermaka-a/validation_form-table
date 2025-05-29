class FetchDataError extends Error {
    code: number | undefined;
    constructor(code: number | undefined, message: string | undefined) {
        super(message);
        this.name = "FetchDataError";
        this.code = code;
    }
}

export default FetchDataError;