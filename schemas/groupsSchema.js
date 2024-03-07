import Joi from "joi";
// додав колекцію groups для запам'ятовування і тренування з методом populate()
const createGroupSchema = Joi.object({
  name: Joi.string().required(),
});

const updateGroupSchema = Joi.object({
  name: Joi.string(),
});

export default { createGroupSchema, updateGroupSchema };
