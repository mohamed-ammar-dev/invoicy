import Joi from "joi";

export const twoFactorLoginSchema = Joi.object({
  code: Joi.number().required(),
});
