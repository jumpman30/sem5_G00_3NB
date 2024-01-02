import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    // Common fields for all tasks
    user: {
      type: String,
      required: true,
      index: true,
    },
    taskType: {
      type: String,
      required: true,
      index: true,
    },
    taskStatus: {
      type: String,
      required: true,
      index: true,
    },
  },
  { timestamps: true },
);

const Task = mongoose.model('Task', taskSchema);
