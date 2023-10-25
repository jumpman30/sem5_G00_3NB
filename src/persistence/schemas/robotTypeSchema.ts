import { IRobotTypePersistence } from '../../dataschema/IRobotTypePersistence';
import mongoose from 'mongoose';

const RobotTypeSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    robotType: { type: String, required: true, }
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IRobotTypePersistence & mongoose.Document>(
  'RobotType',
  RobotTypeSchema,
);
