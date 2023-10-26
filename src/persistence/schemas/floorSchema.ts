import mongoose from 'mongoose';
import { IFloorPersistence } from '../../dataschema/IFloorPersistence';

const Floor = new mongoose.Schema(
  {
    domainId: {
      type: String,
      unique: true,
    },

    buildingId: {
      type: String,
      required: [true, 'Please enter buildingId'],
      index: true,
    },

    number: {
      type: String,
      required: [true, 'Please enter number'],
    },
  },
  { timestamps: true },
);

export default mongoose.model<IFloorPersistence & mongoose.Document>(
  'Floor',
  Floor,
);
