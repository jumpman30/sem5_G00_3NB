import mongoose from 'mongoose';
import { IFloorPersistence } from '../../dataschema/IFloorPersistence';
import { FloorMap } from '../../domain/floorMap';

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

    floorMap: {
      type: Object,
      required: false,
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
