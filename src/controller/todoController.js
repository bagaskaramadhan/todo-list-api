const todoModel = require("../model/todoModel");
const mongoose = require("mongoose");
const service = require("../services/todoServices/todo");

exports.getTodos = async (req, res) => {
  try {
    const allTodos = await todoModel.find();
    res.status(200).json(allTodos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTodosById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await service.getTodosById(id);
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
    await service.createTodo(body);
    res.status(201).json({ message: "Todo Created" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid Todo Id",
      });
    }
    const checkData = await todoModel.findById(id);
    if (!checkData) {
      return res.status(404).json({ message: "Todo not found" });
    }
    const body = {
      title: req.body.title,
      description: req.body.description || "",
      taskList: req.body.taskList,
      deadline: new Date(req.body.deadline),
      completed: req.body.completed,
    };
    const todo = await todoModel.findByIdAndUpdate(id, body);
    res.status(200).json(todo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    await service.deleteTodo(id);
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
