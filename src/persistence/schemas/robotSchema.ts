import { IRobotPersistence } from '../../dataschema/IRobotPersistence';
import mongoose from 'mongoose';
import {Robot} from "../../domain/robot/robot";

const Truck = new mongoose.Schema(
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

    designacao: {
      type: String,
      required: [true, 'Inserir designacao'],
      index: true,
    },

    numeroSerie: {
      type: Number,
      required: [true, 'Inserir numero serie'],
      index: true,
    },

    estado: {
      type: Boolean,
      required: [true,'Inserir estado'],
      index: true,
    }
  },
  { timestamps: true },
);

export default mongoose.model<IRobotPersistence & mongoose.Document>('Robot', Robot);
