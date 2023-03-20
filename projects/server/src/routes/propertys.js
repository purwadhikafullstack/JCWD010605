const express = require('express');
const router = express.Router();
const { propertysController } = require('../controllers');

router.get('/', propertysController.getPropertys);
// router.post('/:id', propertysController.deletePropertys);
router.get('/detail/:id', propertysController.getPropertyDetail);
router.get('/rooms/:id', propertysController.getRoomsDetail);
router.post('/rooms/:roomIds', propertysController.addTransactionRoom);
// router.get('/rooms/', propertysController.getRooms);

module.exports = router;
