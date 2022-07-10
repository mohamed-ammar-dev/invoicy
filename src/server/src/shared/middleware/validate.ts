import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

export const validate = (schema: ObjectSchema) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    await schema.validateAsync(request.body);

    next();
  };
};
