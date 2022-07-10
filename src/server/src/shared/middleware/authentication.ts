import { NextFunction, Request, Response } from "express";
import authHelper from "../../user-management-module/domain/core/helpers/authHelper";
import { AppError } from "../../error-module/baseError/appError";
import { STATUS_CODE } from "../../error-module/types/statusCode";

export const auth = async (
  request: Request,
  _: Response,
  next: NextFunction
) => {
  let token = request.signedCookies.token || request.headers.authorization;

  token = token?.replace(/(B|b)earer /, "");

  if (!token)
    throw new AppError(
      "there is missing parameter",
      STATUS_CODE.VALIDATION_ERROR
    );

  const user = authHelper.verifyAccessToken(token);

  if (!user)
    throw new AppError(
      "there is missing parameter",
      STATUS_CODE.VALIDATION_ERROR
    );

  request.user = user;

  next();
};
