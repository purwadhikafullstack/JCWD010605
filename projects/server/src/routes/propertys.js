const express = require('express');
const router = express.Router();
const { propertysController } = require('../controllers');

router.get('/', propertysController.getPropertys);
// router.post('/:id', propertysController.deletePropertys);
router.get('/detail/:id', propertysController.getPropertyDetail);
router.get('/rooms/:id', propertysController.getRoomsDetail);
router.post('/transaction', propertysController.addTransactionRoom);
router.get('/bookinglist', propertysController.getBookingList);
// router.get('/rooms/', propertysController.getRooms);

module.exports = router;
