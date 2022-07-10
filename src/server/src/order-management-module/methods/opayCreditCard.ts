import { IPayment } from "../interfaces/IPayment";
import { OPay } from "../providers/opay";
import { createPaymentRequest } from "../types/createPaymentRequest";

export class OPayCreditCard extends OPay implements IPayment {
  async createOrder(params: createPaymentRequest) {
    return await super.createOrder({ ...params, payMethod: "BankCard" });
  }
}
