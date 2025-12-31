const mongoose = require("mongoose");

const taskListSchema = new mongoose.Schema(
  {
    task: { type: String, required: true, trim: true },
    isDone: { type: Boolean, default: false },
  },
  { _id: false }
);

const todoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    taskList: { type: [taskListSchema], default: [] },
    description: { type: String, trim: true },
    completed: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    completedAt: { type: Date },
    deadline: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Todo", todoSchema, "todolistmo");
