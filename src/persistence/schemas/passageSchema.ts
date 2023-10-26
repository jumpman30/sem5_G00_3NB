import mongoose from 'mongoose';
import { IRoomPersistence } from '../../dataschema/IRoomPersistence';
import { IPassagePersistence } from '../../dataschema/IPassagePersistence';

const Passage = new mongoose.Schema(
  {
    domainId: {
      type: String,
      unique: true,
    },

    building1Id: {
      type: String,
      required: [true, 'Please enter building id'],
    },

    building2Id: {
      type: String,
      required: [true, 'Please enter building id'],
    },

    floorId: {
      type: String,
      required: [true, 'Please enter floor id'],
    },

    locationBuilding1: {
      type: [
        {
          x: { type: String, required: [true, 'Please enter coordinate x'] },
          y: { type: String, required: [true, 'Please enter coordinate y'] },
        },
      ],
    },

    locationBuilding2: {
      type: [
        {
          x: { type: String, required: [true, 'Please enter coordinate x'] },
          y: { type: String, required: [true, 'Please enter coordinate y'] },
        },
      ],
    },
  },
  { timestamps: true },
);

export default mongoose.model<IPassagePersistence & mongoose.Document>(
  'Passage',
  Passage,
);
