import Joi from "joi";
import { emailSchema } from "./email";

export const userRegisterSchema = emailSchema.keys({
  name: Joi.string().required(),
  password: Joi.string().required(),
});
