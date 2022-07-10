import { AppError } from "../../../error-module/baseError/appError";
import { STATUS_CODE } from "../../../error-module/types/statusCode";
import { ORDER_STATUS } from "../../enums/orderStatus";

class OrderHelper {
  validateOrderStatus(status: any) {
    if (status == ORDER_STATUS.NOT_VERIFIED)
      throw new AppError("order not verified", STATUS_CODE.VALIDATION_ERROR);
  }

  validateOrder(order: any) {
    if (!order) throw new AppError("order not found", STATUS_CODE.NOT_FOUND);
  }

  validatePayment(payment: any) {
    if (!payment)
      throw new AppError("payment not found", STATUS_CODE.NOT_FOUND);
  }
}

export default new OrderHelper();
