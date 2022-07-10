import { PAYMENT_METHOD } from "../enums/paymentMethods";

export type createManualOrder = {
  orderName: string;
  amount: number;
  userId: number;
  paymentMethod: PAYMENT_METHOD;
  baseUrl: string;
};
