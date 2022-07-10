import { Request, Response, NextFunction } from "express";
import { errorHandlerFactory } from "../../factory/errorHandlerFactory";
import { sendErrorDev } from "../../utils/sendErrorDev";
import { sendErrorProd } from "../../utils/sendErrorProd";

export = (
  error: any,
  request: Request,
  response: Response,
  _2: NextFunction
) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  if (process.env.NODE_ENV === "development")
    return sendErrorDev(error, response);

  error = errorHandlerFactory(error);

  sendErrorProd(error, response, request);
};
