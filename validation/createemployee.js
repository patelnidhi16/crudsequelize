var Joi = require("joi");
const _validationOptions = {
  abortEarly: false,
  stripUnknown: true,
  allowUnknown: true,
};

const createUserSchema = Joi.object().keys({
  name: Joi.string()
    .regex(/^[a-zA-Z]/)
    .min(3)
    .max(30)
    .required()
    .messages({
      "string.empty": "name cannot be an empty field",
      "string.min": "name should have a minimum length of {#limit}",
      "string.max": `"name" should have a minimum length of {#limit}`,
      "any.required": "name is a required field",
      "string.pattern.base": "name contains only alphabet",
    }),

  mobile: Joi.string()
    .length(10)
    .pattern(/[0-9]{10}/)
    .required()
    .messages({
      "string.empty": "mobile cannot be an empty field",
      "string.length": "mobile should have  length of {#limit}",
      "any.required": "mobile is a required field",
      "string.pattern.base": "mobile contains only digits",
    }),

  email: Joi.string().email().messages({
    "string.empty": "email cannot be an empty field",
    "string.email": "please enter valid email",
    "any.required": "email is a required field",
  }),
  image: Joi.string().messages({
    "string.empty": "please select image",
  }),
});

const validationjs = (payload, req, res) => {
  var validationResult = createUserSchema.validate(payload, _validationOptions);

  if (validationResult.error) {
    const error = {};
    var detailsArray = validationResult.error.details;
    const message = "Validation Failed";
    detailsArray.forEach((element) => {
      const key = element["context"].key;
      error[`${key}`] = element.message;
    });
    res.json({ status: false, message: message, error: error });
  } else {
    return true;
  }
};

module.exports = validationjs;
