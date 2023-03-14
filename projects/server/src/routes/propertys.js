const express = require('express');
const router = express.Router();
const { propertysController } = require('../controllers');

router.get('/', propertysController.getPropertys);

module.exports = router;
