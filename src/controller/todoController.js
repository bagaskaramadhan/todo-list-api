const todoController = require("../model/todoModel");

exports.getTodos = async (req, res) => {
  try {
    const allTodos = await todoController.find();
    res.status(200).json(allTodos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createTodo = async (req, res) => {
  try {
    const body = {
      title: req.body.title,
      description: req.body.description || "",
      taskList: req.body.taskList,
      deadline: new Date(req.body.deadline),
    };
    const todo = await todoController.create(body);
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
