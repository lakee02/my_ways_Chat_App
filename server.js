const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const keys = require('./config/keys');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);


mongoose
  .connect(keys.mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
require('./middleware/authMiddleware');


const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');
const taskRoutes = require('./routes/taskRoutes');
app.use('/auth', authRoutes);
app.use('/chat', chatRoutes);
app.use('/task', taskRoutes);


const chatSocket = require('./sockets/chatSocket');
chatSocket(io);

const taskSocket = require('./sockets/taskSocket');
taskSocket(io);

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
