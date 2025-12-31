const express = require("express");
const router = express.Router();
const todoController = require("../controller/todoController");
const prefix = "/v1";

router.get(`${prefix}/todos`, todoController.getTodos);
router.get(`${prefix}/todo/:id`, todoController.getTodosById);
router.post(`${prefix}/todo`, todoController.createTodo);
router.put(`${prefix}/todo/:id`, todoController.updateTodo);
router.delete(`${prefix}/todo/:id`, todoController.deleteTodo);

module.exports = router;