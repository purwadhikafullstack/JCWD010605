const express = require('express');
const router = express.Router();
const { propertysController } = require('../controllers');
const uploader = require('../middleware/uploader');

router.get('/', propertysController.getPropertys);
// router.post('/:id', propertysController.deletePropertys);
router.get('/detail/:id', propertysController.getPropertyDetail);
router.get('/rooms/:id', propertysController.getRoomsDetail);
router.post('/transaction', propertysController.addTransactionRoom);
router.get('/bookinglist', propertysController.getBookingList);
router.post('/cancel', propertysController.cancelTransaction);
// router.get('/rooms/', propertysController.getRooms);

router.post(
  '/paymentup/',
  uploader('PaymentProof', 'PaymentProof').single('image_url'),
  propertysController.testPay
);

module.exports = router;
