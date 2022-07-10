import Joi from "joi";
import { PAYMENT_METHOD } from "../../enums/paymentMethods";

export const createManualOrderSchema = Joi.object({
  orderId: Joi.number().required(),
  paymentMethod: Joi.string()
    .valid(PAYMENT_METHOD.CREDIT_CARD, PAYMENT_METHOD.WALLET)
    .required(),
  amount: Joi.number().required(),
  orderName: Joi.string().required(),
});
