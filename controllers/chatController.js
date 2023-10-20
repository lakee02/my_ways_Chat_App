const ChatRoom = require('../models/ChatRoom');

const createChatRoom = (req, res) => {
  const { name } = req.body;

  const newChatRoom = new ChatRoom({ name });

  newChatRoom
    .save()
    .then((chatRoom) => {
      res.status(201).json({ status: 'success', data: chatRoom });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ status: 'error', message: 'Failed to create chat room' });
    });
};

const getChatRooms = (req, res) => {
  ChatRoom.find()
    .then((chatRooms) => {
      res.status(200).json({ status: 'success', data: chatRooms });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ status: 'error', message: 'Failed to retrieve chat rooms' });
    });
};

// Export the chat controllers
module.exports = {
  createChatRoom,
  getChatRooms,
};
