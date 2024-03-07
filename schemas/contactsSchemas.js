import Joi from "joi";

const createContactSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .message("Name must have min 3 chr")
    .max(30)
    .message("Name must have max 30 chr")
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .message("Must be a valid email"),
  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .message("Phone number must be like (000) 111-2233"),
  favorite: Joi.boolean(),
  group: Joi.string().required(),
});

const updateContactSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .message("Name must have min 3 chr")
    .max(30)
    .message("Name must have max 30 chr"),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .message("Must be a valid email"),
  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .message("Phone number must be like (000) 111-2233"),
  favorite: Joi.boolean(),
  group: Joi.string(),
})
  .min(1)
  .message("Body must have at least one field");

export default { createContactSchema, updateContactSchema };
