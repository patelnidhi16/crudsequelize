var Joi = require("joi");
const _validationOptions = {
  abortEarly: false,
  stripUnknown: true,
  allowUnknown: true,
};

const authSchema = Joi.object().keys({
  email: Joi.string().email().messages({
    "string.empty": "email cannot be an empty field",
    "string.email": "please enter valid email",
    "any.required": "email is a required field",
  }),
  password: Joi.string().min(5).max(10).messages({
    "string.min": "password should have a minimum length of {#limit}",
    "string.max": "password should have a minimum length of {#limit}",
    "string.empty": "password cannot be an empty field",
    "any.required": "password is a required field",
  }),
});

const validationjs = (payload, req, res) => {
  var validationResult = authSchema.validate(payload, _validationOptions);

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
