const express = require('express');
const router = express.Router();
const { authController } = require('../controllers');
// const { validate2, userValidator } = require('../middlewares/validator');

router.post('/v1', authController.register);

// router.get('/', authController.getUsers);

router.post('/login', authController.login);

// router.delete('/:id', authController.deleteUsers);












module.exports = router;
