import Joi from "joi";
import { emailSchema } from "./email";

export const loginSchema = emailSchema.keys({
  password: Joi.string().required(),
});
