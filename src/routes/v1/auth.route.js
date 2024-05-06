const express = require('express');
const { authMiddleware, validateMiddleware, catchMiddleware } = require('../../middlewares');
const { authController } = require('../../controllers');
const { authValidator } = require('../../validators');

const authRouter = express.Router();

authRouter.post('/auth/login', validateMiddleware(authValidator.loginSchema), catchMiddleware(authController.login));
authRouter.post('/auth/signup', validateMiddleware(authValidator.signupSchema), catchMiddleware(authController.signup));


module.exports = authRouter;
