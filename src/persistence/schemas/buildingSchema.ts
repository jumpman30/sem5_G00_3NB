import { IBuildingPersistence } from '../../dataschema/IBuildingPersistence';
import mongoose from 'mongoose';

const Building = new mongoose.Schema(
  {
    domainId: {
      type: String,
      unique: true,
    },
      code: {
      type: String,
      required: [true, 'Inserir code'],
      index: true,
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
  },
  { timestamps: true },
);

export default mongoose.model<IBuildingPersistence & mongoose.Document>('Building', Building);

