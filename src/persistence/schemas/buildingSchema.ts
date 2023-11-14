import mongoose from 'mongoose';
import { IBuildingPersistence } from '../../dataschema/IBuildingPersistence';

const Building = new mongoose.Schema(
  {
    domainId: {
      type: String,
      unique: true,
    },

    designation: {
      type: String,
      required: [true, 'Please enter designation'],
      index: true,
    },

    length: {
      type: String,
      required: [true, 'Please enter length'],
    },

    width: {
      type: String,
      required: [true, 'Please enter width'],
    },
  },
  { timestamps: true },
);

export default mongoose.model<IBuildingPersistence & mongoose.Document>(
  'Building',
  Building,
);
