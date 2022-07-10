import express from "express";
import catchAsync from "../../../error-module/utils/catchAsync";
import joiCatchAsync from "../../../error-module/utils/joiCatchAsync";
import { auth } from "../../../shared/middleware/authentication";
import { validate } from "../../../shared/middleware/validate";
import { OrderController } from "../controllers/orderController";
import { createManualOrderSchema } from "../schemas/createManualOrder";
const router = express.Router();

router.post(
  "/createManualOrder",
  catchAsync(auth),
  joiCatchAsync(validate(createManualOrderSchema)),
  catchAsync(new OrderController().createManualOrder)
);

router.get("/opay/callback", catchAsync(new OrderController().opayCallback));

export default router;
