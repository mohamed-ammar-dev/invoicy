import { Request, Response, NextFunction } from "express";

export = (fn: Function) => {
  return (request: Request, response: Response, next: NextFunction) => {
    fn(request, response, next).catch(next);
  };
};
