export type createPaymentRequest = {
  amount: number;
  orderId: string;
  baseUrl: string;
  payMethod?: string;
};
