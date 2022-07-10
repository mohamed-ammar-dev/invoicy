import { Response } from "express";

export function sendResponse(response: Response, result?: any) {
  response.send({ statusCode: 200, result });
}
