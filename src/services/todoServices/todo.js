const dayjs = require("dayjs");
const todoModel = require("../../model/todoModel");
const mongoose = require("mongoose");
const userModel = require("../../model/userModel");

async function getTodos(userId) {
  try {
    return await todoModel.find({ active: true, active: true, userId });
  } catch (err) {
    throw err;
  }
}

async function getTodosById(id, userId) {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error(`${id} invalid`);
    }
    const checkData = await todoModel.findById(id);
    if (!checkData) {
      throw new Error("Todo not found");
    }
    const result = await todoModel.findOne({ _id: id, active: true, userId });
    if (!result) {
      throw new Error("Todo not found");
    }
    return result;
  } catch (err) {
    throw err;
  }
}

async function createTodo(body, userId) {
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
    return await todoModel.create({ ...body, userId });
  } catch (err) {
    throw err;
  }
}

async function deleteTodo(id, userId) {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error(`${id} invalid`);
    }
    const checkData = await todoModel.findById(id);
    if (!checkData) {
      throw new Error("Todo not found");
    }
    // soft delete
    if (checkData.userId !== userId) {
      throw new Error("Unauthorized access");
    }
    return await todoModel.findByIdAndUpdate(id, { active: false });
  } catch (err) {
    throw err;
  }
}

async function updateTodo(id, body, userId) {
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
    if (checkData.userId !== userId) {
      throw new Error("Unauthorized access");
    }
    return await todoModel.findByIdAndUpdate(id, body);
  } catch (err) {
    throw err;
  }
}

async function authorizationAccess(req) {
  try {
    let authUser = req.user.id;
    const checkData = await userModel.findById(authUser);
    if (!checkData) {
      throw new Error("Invalid authorization");
    }
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
  authorizationAccess,
};
