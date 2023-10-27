import { IRobotPersistence } from '../../dataschema/IRobotPersistence';
import mongoose from 'mongoose';

const Robot = new mongoose.Schema(
  {
    domainId: {
      type: String,
      unique: true
    },

    nickname: {
      type: String,
      required: [true, 'Inserir nickname'],
      index: true,
      unique: true,
    },

    designation: {
      type: String,
      required: [true, 'Inserir designation'],
      index: true,
    },

    serialNumber: {
      type: Number,
      required: [true, 'Inserir numero serie'],
      index: true,
      unique: true
    },

    state: {
      type: Boolean,
      required: [true,'Inserir state'],
      index: true,
    },

    robotType: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'RobotType',
      required: [true,'insert robot type'],
      index: true,
    }
  },
  { timestamps: true },
);

export default mongoose.model<IRobotPersistence & mongoose.Document>('Robot', Robot);
