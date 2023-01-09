const express = require('express')
const router = new express.Router();
const { controller, asyncWrapper } = require('../../helpers');
const { validateData, authMiddleware } = require('../../middlewares');
const { schemas } = require('../../models/contacts');
const { registrationContoller, loginController, } = require('../../controllers/authController');


router.post('/singup', validateData(schemas.schema), asyncWrapper(registrationContoller))

router.post('/login', validateData(schemas.schema), asyncWrapper(loginController));

router.get('/logout', authMiddleware, controller.logout);

router.get('/current', authMiddleware, controller.getCurrentUser);

module.exports = router;

