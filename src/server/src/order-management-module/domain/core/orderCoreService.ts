import paymentMethodsFactory from "../../factories/paymentMethodsFactory";
import { IOrderRepo } from "../ports/IOrderRepo";
import { Transaction } from "sequelize";
import orderHelper from "./orderHelper";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { DI_TYPES } from "../../../shared/types/di";
import { ORDER_STATUS } from "../../enums/orderStatus";
import { createManualOrder } from "../../types/createManualOrder";
import { server } from "../../../config/server";
import { IOrderCoreService } from "../../interfaces/IOrderCoreService";

@injectable()
export class OrderCoreService implements IOrderCoreService {
  constructor(
    @inject(DI_TYPES.OrderRepo)
    private orderRepo: IOrderRepo
  ) {}

  async opayCallback(params: any) {
    const payload = params.payload;
    const orderId = payload.reference;
    let status = ORDER_STATUS.UNPAID;

    if (params.type == "transaction-status" && payload.status == "SUCCESS")
      status = ORDER_STATUS.PAID;

    await this.updateOrderStatus({ orderId, status });
  }

  async createManualOrder(params: createManualOrder) {
    return await server.dataBaseConnection.transaction(
      { isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE },
      async () => {
        const order = await this.createOrder(params);

        if (order.status != ORDER_STATUS.VERIFIED)
          return { message: "oder not verified" };

        return order;
      }
    );
  }

  private async createOrder(params: createManualOrder) {
    const userId = params.userId;

    const paymentGateway = paymentMethodsFactory.createPaymentInstance(
      params.paymentMethod
    );

    let orderRecord = await this.orderRepo.create({
      status: ORDER_STATUS.INITIALIZED,
      orderName: params.orderName,
      amount: params.amount,
      userId,
      paymentMethod: params.paymentMethod,
    });

    const orderId = orderRecord.id;

    const providerOrder = await paymentGateway!.createOrder({
      ...params,
      orderId,
    });

    orderRecord = await this.orderRepo.update!({
      condition: { id: orderId },
      update: {
        providerOrderId: providerOrder.providerOrderId,
        status: providerOrder.status,
      },
    });

    orderHelper.validateOrderStatus(providerOrder.status);

    return providerOrder;
  }

  async updateOrderStatus(params: any) {
    const status = params.status;
    const id = params.orderId;

    const updatedOrder = await this.orderRepo.update!({
      condition: { id },
      update: { status },
    });

    return updatedOrder;
  }

  async getOrderDetailsByProviderOrderId(params: any) {
    const providerOrderId = params.providerOrderId;

    const order = await this.orderRepo.findOne!({
      condition: { providerOrderId },
    });

    orderHelper.validateOrder(order);

    return order;
  }

  async getOrderByOrderId(params: any) {
    const orderId = params.orderId;

    const payment = await this.orderRepo.findOne!({ condition: { orderId } });

    orderHelper.validatePayment(payment);

    return payment;
  }
}
