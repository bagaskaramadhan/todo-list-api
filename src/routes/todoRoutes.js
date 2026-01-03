const express = require("express");
const router = express.Router();
const todoController = require("../controller/todoController");
const authMiddleware = require("../middleware/auth");
const authorizationAccess = require("../middleware/authorizationAccess");

router.get("/todos", authMiddleware, authorizationAccess, todoController.getTodos);
router.get("/todo/:id", authMiddleware, authorizationAccess, todoController.getTodosById);
router.post("/todo", authMiddleware, authorizationAccess, todoController.createTodo);
router.put("/todo/:id", authMiddleware, authorizationAccess, todoController.updateTodo);
router.delete("/todo/:id", authMiddleware, authorizationAccess, todoController.deleteTodo);

module.exports = router;
