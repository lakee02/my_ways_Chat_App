const Task = require('../models/Task');


const createTask = (req, res) => {
  const { title, description, status, room } = req.body;

  const newTask = new Task({ title, description, status, room });

  newTask
    .save()
    .then((task) => {
      res.json(task);
    })
    .catch((err) => console.log(err));
};


const getTasksInRoom = (req, res) => {
  const { room } = req.params;

  Task.find({ room })
    .then((tasks) => {
      res.json(tasks);
    })
    .catch((err) => console.log(err));
};


module.exports = {
  createTask,
  getTasksInRoom,
  
};
