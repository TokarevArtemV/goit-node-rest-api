import Joi from "joi";
import { emailRegexp, subscriptionTypes } from "../constans/user-constans.js";

const userSignupSchema = Joi.object({
  email: Joi.string()
    .pattern(emailRegexp)
    .message("Must be a valid email")
    .required(),
  password: Joi.string()
    .min(6)
    .message("Password must have min 3 chr")
    .max(30)
    .message("Password must have max 30 chr")
    .required(),
  subscription: Joi.string().valid(...subscriptionTypes),
  token: Joi.boolean(),
});

const userSigninSchema = Joi.object({
  email: Joi.string()
    .pattern(emailRegexp)
    .message("Must be a valid email")
    .required(),
  password: Joi.string()
    .min(6)
    .message("Password must have min 3 chr")
    .max(30)
    .message("Password must have max 30 chr")
    .required(),
});

const userUpdateSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionTypes)
    .required(),
});

export default { userSignupSchema, userSigninSchema, userUpdateSchema };
