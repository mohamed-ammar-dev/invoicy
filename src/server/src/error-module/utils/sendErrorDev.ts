import { Response } from "express";

export const sendErrorDev = (err: any, res: Response) => {
  res.status(err.statusCode).send({
    status: err.status,
    error: {
      statusCode: err.statusCode,
      message: err.message,
      stack: err.stack,
    },
  });
};
