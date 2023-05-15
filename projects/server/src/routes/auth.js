const express = require('express');
const router = express.Router();
const { authController } = require('../controllers');

router.post('/v1', authController.register);
router.post('/login', authController.login);
router.patch('/changePassword', authController.changePassword);
router.post('/register-tenant', authController.registerTenant);
router.get('/keeplogin', authController.keeplogin)

module.exports = router;
