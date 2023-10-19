const ChatRoom = require('../models/ChatRoom');

const createChatRoom = (req, res) => {
  const { name } = req.body;

  const newChatRoom = new ChatRoom({ name });

  newChatRoom
    .save()
    .then((chatRoom) => {
      res.json(chatRoom);
    })
    .catch((err) => console.log(err));
};


const getChatRooms = (req, res) => {
  ChatRoom.find()
    .then((chatRooms) => {
      res.json(chatRooms);
    })
    .catch((err) => console.log(err));
};

// Export the chat controllers
module.exports = {
  createChatRoom,
  getChatRooms,
};
