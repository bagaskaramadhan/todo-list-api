const express = require("express");
const router = express.Router();
const todoController = require("../controller/todoController");
const prefix = "/v1";

router.get(`${prefix}/allTodos`, todoController.getTodos);
router.post(`${prefix}/todo`, todoController.createTodo);

module.exports = router;