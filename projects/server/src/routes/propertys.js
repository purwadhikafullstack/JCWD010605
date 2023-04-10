const express = require('express');
const router = express.Router();
const { getPropertys, addProperty } = require('../controllers/propertys');

router.get('/', getPropertys);
router.post('/', addProperty)

module.exports = router;
