import Joi from "joi";
import { emailSchema } from "./email";

export const resetPasswordSchema = emailSchema.keys({
  code: Joi.number().required(),
  newPassword: Joi.string().required(),
});
