import { IBuildingPersistence } from '../../dataschema/IBuildingPersistence';
import mongoose from 'mongoose';

const BuildingSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, 'Insert building code'],
    unique: true,
  },
  name: {
    type: String,
    required: [false],
  },
  length: {
    type: String,
    required: [true, 'Please enter length'],
  },
  width: {
    type: String,
    required: [true, 'Please enter width'],
  },
});

export default mongoose.model<IBuildingPersistence & mongoose.Document>(
  'Building',
  BuildingSchema,
);
