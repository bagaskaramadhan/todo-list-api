const service = require("../services/todoServices/todo");

exports.getTodos = async (req, res) => {
  try {
    const result = await service.getTodos(req.user.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTodosById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await service.getTodosById(id, req.user.id);
    res.status(200).json(result);
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
    await service.createTodo(body, req.user.id);
    res.status(201).json({ message: "Todo Created" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const body = {
      title: req.body.title,
      description: req.body.description || "",
      taskList: req.body.taskList,
      deadline: new Date(req.body.deadline),
      completed: req.body.completed,
      updatedAt: new Date(),
    };
    await service.updateTodo(id, body, req.user.id);
    res.status(200).json({ message: "Todo Updated" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    await service.deleteTodo(id, req.user.id);
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
