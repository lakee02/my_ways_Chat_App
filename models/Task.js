const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    default: 'To-Do',
  },
  room: {
    type: Schema.Types.ObjectId,
    ref: 'ChatRoom', 
    required: true,
  },
  
});

module.exports = mongoose.model('Task', taskSchema);
