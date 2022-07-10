import { AppError } from "../baseError/appError";
import { STATUS_CODE } from "../types/statusCode";

class ErrorHandler {
  handleJWTError() {
    new AppError("Invalid token.", STATUS_CODE.AUTHORIZATION_ERROR);
  }

  handleJWTExpiredError() {
    new AppError("Your token has expired!", STATUS_CODE.AUTHORIZATION_ERROR);
  }
}

export default new ErrorHandler();
