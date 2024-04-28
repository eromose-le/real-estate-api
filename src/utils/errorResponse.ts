import { EnvKeys } from "../common/EnvKeys";

export class ErrorResponse extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public error: string = message,
    public success: boolean = false
  ) {
    super(message);
    // this.name = "ErrorResponse"; // Optional

    if (EnvKeys.isLocal()) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
