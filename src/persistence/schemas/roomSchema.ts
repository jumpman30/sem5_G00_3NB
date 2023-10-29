import mongoose from 'mongoose';
import { IRoomPersistence } from '../../dataschema/IRoomPersistence';
import userSchema from './userSchema';

const Room = new mongoose.Schema(
  {
    domainId: {
      type: String,
      unique: true,
    },

    buildingId: {
      type: String,
      required: [true, 'Please enter building id'],
    },

    designation: {
      type: String,
      required: [true, 'Please enter designation'],
    },

    doorLocation: {
      x: { type: String, required: [true, 'Please enter coordinate x'] },
      y: { type: String, required: [true, 'Please enter coordinate y'] },
    },

    floorId: {
      type: String,
      required: [true, 'Please enter floor id'],
    },

    location: {
      x: { type: String, required: [true, 'Please enter coordinate x'] },
      y: { type: String, required: [true, 'Please enter coordinate y'] },
    },
  },
  { timestamps: true },
);

export default mongoose.model<IRoomPersistence & mongoose.Document>(
  'Room',
  Room,
);
