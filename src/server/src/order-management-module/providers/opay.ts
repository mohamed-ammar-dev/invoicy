import jsSHA from "jssha";
import networkingRest from "../../3rd-party-module/networkingRest";
import {
  OPAY_BASE_URL,
  OPAY_MERCHANT_ID,
  OPAY_PUBLIC_KEY,
  OPAY_SECRET_KEY,
} from "../../config/constants";
import { ORDER_STATUS } from "../enums/orderStatus";
import { IPayment } from "../interfaces/IPayment";
import { createPaymentRequest } from "../types/createPaymentRequest";

export class OPay implements IPayment {
  async createOrder(params: createPaymentRequest) {
    const baseUrl =
      params.baseUrl == "localhost" ? "http://localhost:3000" : params.baseUrl;

    const payload = {
      amount: {
        currency: "EGP",
        total: params.amount * 100,
      },
      callbackUrl: `${baseUrl}/order/opay/callback`,
      cancelUrl: `${baseUrl}`,
      country: "EG",
      expireAt: 300,
      payMethod: params.payMethod,
      productList: [
        {
          description: "manual order",
          name: params.orderId,
          price: params.amount * 100,
          productId: params.orderId,
          quantity: 1,
        },
      ],
      reference: params.orderId,
      returnUrl: `${baseUrl}`,
    };

    const order: any = await networkingRest.post({
      url: `${OPAY_BASE_URL}/international/cashier/create`,
      headers: {
        "content-type": "application/json",
        MerchantId: OPAY_MERCHANT_ID,
        Authorization: "Bearer " + OPAY_PUBLIC_KEY,
      },
      body: payload,
    });

    if (order.message == "SUCCESSFUL")
      return {
        providerOrderId: order.data.orderNo,
        status: ORDER_STATUS.VERIFIED,
        url: order.data.cashierUrl,
      };

    return {
      status: ORDER_STATUS.NOT_VERIFIED,
    };
  }

  protected getSignature(payload: any) {
    const o2s = JSON.stringify(payload);

    const hash = new jsSHA("SHA-512", "TEXT", {
      hmacKey: { value: OPAY_SECRET_KEY.toString(), format: "TEXT" },
    });

    hash.update(o2s);
    return hash.getHash("HEX");
  }
}

export default new OPay();
