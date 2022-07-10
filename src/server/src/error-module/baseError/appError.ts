import { STATUS_CODE } from "../types/statusCode";

export class AppError extends Error {
  status: string;
  isOperational: boolean;

  constructor(message: string, public statusCode: STATUS_CODE) {
    super(message);

    this.status = `${this.statusCode}`.startsWith("4") ? "fail" : "error";

    // types of error ['programming' or 'operational']
    this.isOperational = true;
  }
}
