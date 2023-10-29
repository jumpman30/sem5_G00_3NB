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
    minimum: {
      type: String,
      required: [true, 'Please enter minimum floors'],
    },
    maximum: {
      type: String,
      required: [true, 'Please enter maximum floors'],
    },
  },
  { timestamps: true },
);

export default mongoose.model<IFloorPersistence & mongoose.Document>(
  'Floor',
  Floor,
);
