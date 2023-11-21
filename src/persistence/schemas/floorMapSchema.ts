import mongoose from 'mongoose';
import { IFloorMapPersistence } from '../../dataschema/IFloorMapPersistence';

const FloorMap = new mongoose.Schema(
  {
    floorId: {
      type: String,
      unique: true,
    },

    buildingId: {
      type: String,
      required: [true, 'Please enter buildingId'],
      index: true,
    },

    size: {
      type: Object,
      required: [true, 'Please enter number'],
    },
    rooms: {
      type: [Object],
      required: [true, 'Please enter rooms'],
    },
    passages: {
      type: [Object],
      required: [true, 'Please enter passages'],
    },
    elevators: {
      type: [Object],
      required: [true, 'Please enter elevators'],
    },
  },
  { timestamps: true },
);

export default mongoose.model<IFloorMapPersistence & mongoose.Document>(
  'FloorMap',
  FloorMap,
);
