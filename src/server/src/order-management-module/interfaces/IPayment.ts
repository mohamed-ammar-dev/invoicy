import { ORDER_STATUS } from "../enums/orderStatus";
import { createPaymentRequest } from "../types/createPaymentRequest";

export interface IPayment {
  createOrder(params: createPaymentRequest): Promise<{
    providerOrderId?: string;
    status: ORDER_STATUS;
    url?: string;
  }>;
}
