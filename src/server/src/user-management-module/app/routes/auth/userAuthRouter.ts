import express from "express";
import { validate } from "../../../../shared/middleware/validate";
import { loginSchema } from "../../schemas/auth/login";
import { userRegisterSchema } from "../../schemas/auth/userRegister";
import catchAsync from "../../../../error-module/utils/catchAsync";
import { UserAuthController } from "../../controllers/auth/userAuthController";
import joiCatchAsync from "../../../../error-module/utils/joiCatchAsync";
import { auth } from "../../../../shared/middleware/authentication";
import { restrictTo } from "../../../../shared/middleware/authorization";
import { ROLE_TYPE } from "../../../../shared/enums/roleTypes";
import { validateForgetPasswordCodeSchema } from "../../schemas/auth/validateForgerPasswordCode";
import { resetPasswordSchema } from "../../schemas/auth/resetPassword";
import { emailSchema } from "../../schemas/auth/email";

const userAuthRouter = express.Router();

userAuthRouter.post(
  "/login",
  joiCatchAsync(validate(loginSchema)),
  catchAsync(new UserAuthController().login)
);

userAuthRouter.post(
  "/register",
  joiCatchAsync(validate(userRegisterSchema)),
  catchAsync(new UserAuthController().register)
);

userAuthRouter.post(
  "/sendForgetPasswordCode",
  joiCatchAsync(validate(emailSchema)),
  catchAsync(new UserAuthController().sendForgetPasswordCode)
);

userAuthRouter.post(
  "/validateForgetPasswordCode",
  joiCatchAsync(validate(validateForgetPasswordCodeSchema)),
  catchAsync(new UserAuthController().validateForgetPasswordCode)
);

userAuthRouter.post(
  "/resetPassword",
  joiCatchAsync(validate(resetPasswordSchema)),
  catchAsync(new UserAuthController().resetPassword)
);

userAuthRouter.get(
  "/logout",
  catchAsync(auth),
  catchAsync(restrictTo([ROLE_TYPE.USER])),
  catchAsync(new UserAuthController().logout)
);

export { userAuthRouter };
