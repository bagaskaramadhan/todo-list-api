const express = require("express");
const router = express.Router();
const todoController = require("../controller/todoController");

router.get("/todos", todoController.getTodos);
router.get("/todo/:id", todoController.getTodosById);
router.post("/todo", todoController.createTodo);
router.put("/todo/:id", todoController.updateTodo);
router.delete("/todo/:id", todoController.deleteTodo);

module.exports = router;