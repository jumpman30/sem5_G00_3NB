import { IRobotTypePersistence } from '../../dataschema/IRobotTypePersistence';
import mongoose from 'mongoose';
import { TaskTypes } from '../../domain/taskType/TaskTypes';

const RobotTypeSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    robotType: { type: String, required: true, },
    taskTypes: { type: [String], enum: Object.values(TaskTypes), required: true, }
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IRobotTypePersistence & mongoose.Document>(
  'RobotType',
  RobotTypeSchema,
);
