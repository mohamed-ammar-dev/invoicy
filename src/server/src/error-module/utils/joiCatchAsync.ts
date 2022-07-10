import { Request, Response, NextFunction } from "express";

export = (fn: Function) => {
  return (request: Request, response: Response, next: NextFunction) => {
    fn(request, response, next).catch((error: any) => {
      error.statusCode = 400;
      next(error);
    });
  };
};
