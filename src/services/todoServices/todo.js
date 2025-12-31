const dayjs = require("dayjs");
const todoModel = require("../../model/todoModel");
const mongoose = require("mongoose");

async function getTodosById(id) {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid Todo Id",
      });
    }
    const checkData = await todoModel.findById(id);
    if (!checkData) {
      return res.status(404).json({ message: "Todo not found" });
    }
    const result = await todoModel.findById(id);
    return result;
  } catch (err) {
    throw err;
  }
}
async function createTodo(body) {
  try {
    // validation deadline
    const currentDate = dayjs();
    const deadline = dayjs(body.deadline);
    const beforeDate = deadline.isBefore(currentDate);
    if (beforeDate) {
      throw new Error("Deadline must be a more than now");
    }

    // Validation taskList
    const validFields = ["task", "isDone"];
    const taskList = body.taskList;
    await taskList.map((item) => {
      const keys = Object.keys(item);
      if (!keys.includes("task") && keys.includes("isDone")) {
        throw new Error(
          "Task cannot be completed because the task field is empty"
        );
      }
      if (keys.includes("isDone")) {
        const isDoneValue = item.isDone;
        if (typeof isDoneValue !== "boolean") {
          throw new Error("isDone field must be a boolean");
        }
      }
      const invalidField = keys.some((key) => !validFields.includes(key));
      if (invalidField) {
        throw new Error("Invalid tasklist field");
      }
    });
    return await todoModel.create(body);
  } catch (err) {
    throw err;
  }
}

async function deleteTodo(id) {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid Todo Id",
      });
    }
    const checkData = await todoModel.findById(id);
    if (!checkData) {
      return res.status(404).json({ message: "Todo not found" });
    }
    return await todoModel.findByIdAndDelete(id);
  } catch (err) {
    throw err;
  }
}

async function updateTodo(id, body) {
  try {
    // Validation id, deadline and body taskList
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getTodosById,
  createTodo,
  deleteTodo,
};
