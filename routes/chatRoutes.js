const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');


router.post('/create', chatController.createChatRoom);

router.get('/list', chatController.getChatRooms);

router.post('/join/:roomId', (req, res) => {
  const roomId = req.params.roomId;
});

router.post('/message/:roomId', (req, res) => {
  const roomId = req.params.roomId;
  const message = req.body.message;
});

router.delete('/delete/:roomId', (req, res) => {
  const roomId = req.params.roomId;
});

module.exports = router;
