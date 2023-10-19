module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('A user connected to the chat room');
  
    socket.on('chat message', (message) => {
      io.emit('chat message', message);
    });
  
    socket.on('disconnect', () => {
      console.log('A user disconnected from the chat room');
    });
  });
};
