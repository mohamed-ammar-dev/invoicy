import { Response, Request } from "express";
import { diContainer } from "../../../config/inversify.config";
import { DI_TYPES } from "../../../shared/types/di";
import { sendResponse } from "../../../shared/utils/sendResponse";
import { IOrderCoreService } from "../../interfaces/IOrderCoreService";

export class OrderController {
  async createManualOrder(request: Request, response: Response) {
    const orderCoreService = diContainer.get<IOrderCoreService>(
      DI_TYPES.OrderCoreService
    );
    const order = await orderCoreService.createManualOrder({
      ...request.body,
      userId: request.user.id,
      baseUrl: request.hostname,
    });

    sendResponse(response, order);
  }

  async opayCallback(request: Request, response: Response) {
    const orderCoreService = diContainer.get<IOrderCoreService>(
      DI_TYPES.OrderCoreService
    );
    const order = await orderCoreService.opayCallback(request.body);

    sendResponse(response, order);
  }
}
