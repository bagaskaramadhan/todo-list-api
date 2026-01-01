const dayjs = require("dayjs");
const todoModel = require("../../model/todoModel");
const mongoose = require("mongoose");

async function getTodos() {
  try {
    return await todoModel.find({ active: true });
  } catch (err) {
    throw err;
  }
}

async function getTodosById(id) {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error(`${id} invalid`);
    }
    const checkData = await todoModel.findById(id);
    if (!checkData) {
      throw new Error("Todo not found");
    }
    const result = await todoModel.findOne({ _id: id, active: true });
    if (!result) {
      throw new Error("Todo not found");
    }
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
      throw new Error(`${id} invalid`);
    }
    const checkData = await todoModel.findById(id);
    if (!checkData) {
      throw new Error("Todo not found");
    }
    // soft delete
    return await todoModel.findByIdAndUpdate(id, { active: false });
  } catch (err) {
    throw err;
  }
}

async function updateTodo(id, body) {
  try {
    // Id validation
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error(`${id} invalid`);
    }
    const checkData = await todoModel.findById(id);
    if (!checkData) {
      throw new Error("Todo not found");
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
    return await todoModel.findByIdAndUpdate(id, body);
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getTodosById,
  createTodo,
  deleteTodo,
  updateTodo,
  getTodos,
};
