import { ERRORS_NAME } from "../types/errorsName";
import errorHandlers from "../handlers/errorHandlers";

export const errorHandlerFactory = (error: any) => {
  switch (error.name) {
    case ERRORS_NAME.JSON_WEB_TOKEN_ERROR:
      return errorHandlers.handleJWTError();

    case ERRORS_NAME.JSON_WEB_TOKEN_ERROR:
      return errorHandlers.handleJWTExpiredError();

    default:
      return error;
  }
};
