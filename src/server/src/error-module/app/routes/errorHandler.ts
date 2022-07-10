import { Request, Response, NextFunction } from "express";
import { server } from "../../../config/server";
import globalErrorHandler from "../controllers/errorController";

server.app.all("*", (_: Request, response: Response, _2: NextFunction) => {
  response
    .status(404)
    .send({ statusCode: 404, error: { message: "Gateway not found." } });
});

server.app.use(globalErrorHandler);
