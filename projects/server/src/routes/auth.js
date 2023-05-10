const express = require('express');
const router = express.Router();
const { authController } = require('../controllers');

// const { validate2, userValidator } = require('../middlewares/validator');

router.post('/v1', authController.register);

// router.get('/', authController.getUsers);

router.post('/login', authController.login);
router.patch('/changePassword', authController.changePassword);
router.post('/register-tenant', authController.registerTenant);
router.get('/keeplogin', authController.keeplogin)


// router.post('/reset-password', loginController.resetPassword);
// router.post('/new-password/:token', loginController.newPassword);

// router.delete('/:id', authController.deleteUsers);












module.exports = router;
