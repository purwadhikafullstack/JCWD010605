const express = require('express');
const router = express.Router();
const { propertysController } = require('../controllers');

router.get('/', propertysController.getPropertys);
router.get('/detail/:id', propertysController.getPropertyDetail);
router.get('/rooms/:id', propertysController.getRoomsDetail);
router.post('/rooms/:roomIds', propertysController.addTransactionRoom);
router.post('/transaction', propertysController.addTransactionRoom);
router.get('/bookinglist', propertysController.getBookingList);

module.exports = router;
