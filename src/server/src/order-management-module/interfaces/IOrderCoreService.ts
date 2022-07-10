import { createManualOrder } from "../types/createManualOrder";

export interface IOrderCoreService {
  createManualOrder(params: createManualOrder): Promise<any>;
  updateOrderStatus(params: any): Promise<any>;
  getOrderDetailsByProviderOrderId(params: any): Promise<any>;
  getOrderByOrderId(params: any): Promise<any>;
  opayCallback(params: any): Promise<any>;
}
