import Joi from "joi";
import { emailSchema } from "./email";

export const validateForgetPasswordCodeSchema = emailSchema.keys({
  code: Joi.number().required(),
});
