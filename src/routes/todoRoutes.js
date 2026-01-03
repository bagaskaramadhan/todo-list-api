const express = require("express");
const router = express.Router();
const todoController = require("../controller/todoController");
const authMiddleware = require("../middleware/auth");

router.get("/todos", authMiddleware, todoController.getTodos);
router.get("/todo/:id", authMiddleware, todoController.getTodosById);
router.post("/todo", authMiddleware, todoController.createTodo);
router.put("/todo/:id", authMiddleware, todoController.updateTodo);
router.delete("/todo/:id", authMiddleware, todoController.deleteTodo);

module.exports = router;
