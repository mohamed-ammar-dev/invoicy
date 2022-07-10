import { PAYMENT_METHOD } from "../enums/paymentMethods";
import { OPayCreditCard } from "../methods/opayCreditCard";
import { OPayWallet } from "../methods/opayWallet";

class PaymentMethodFactory {
  createPaymentInstance(method: string) {
    if (method == PAYMENT_METHOD.CREDIT_CARD) return new OPayCreditCard();
    if (method == PAYMENT_METHOD.WALLET) return new OPayWallet();
  }
}

export default new PaymentMethodFactory();
