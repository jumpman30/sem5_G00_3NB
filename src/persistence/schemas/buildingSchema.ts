import mongoose from 'mongoose';
import { IBuildingPersistence } from '../../dataschema/IBuildingPersistence';

const Building = new mongoose.Schema(
  {
    domainId: {
      type: String,
      unique: true,
      index: true,
    },

    designation: {
      type: String,
      index: true,
    },

    length: {
      type: String,
      required: [true, 'Please enter length'],
      index: true,
    },

    width: {
      type: String,
      required: [true, 'Please enter width'],
      index: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IBuildingPersistence & mongoose.Document>(
  'Building',
  Building,
);
