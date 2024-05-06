const Joi = require('joi');


const emailSchema = Joi.string().email().required();
const passwordSchema = Joi.string().min(6).required();
const phoneSchema = Joi.string().trim().regex(/^\+(?:[0-9] ?){6,14}[0-9]$/)
    .message('Invalid phone number format. Use international format with country code.');


const signupSchema = {
    body: Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: emailSchema,
        password: passwordSchema,
        phoneNumber:phoneSchema.required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
    }).with('password', 'confirmPassword')
};

const loginSchema = {
    body: Joi.object().keys({
  email: emailSchema,
  password: Joi.string().required(),
})
};

const forgotPasswordSchema ={
    body: Joi.object().keys({
  email: emailSchema,
})
};
const resetPasswordSchema = {};
const changePasswordSchema = {};
const logoutSchema = {};

module.exports = {
  loginSchema,
  signupSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
  logoutSchema,
};
