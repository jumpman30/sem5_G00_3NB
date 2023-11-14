import mongoose from 'mongoose';
import { IPassagePersistence } from '../../dataschema/IPassagePersistence';
import { IElevatorPersistence } from '../../dataschema/IElevatorPersistence';

const Elevator = new mongoose.Schema(
  {
    buildingId: {
      type: String,
      required: true
    },

    elevatorId: {
      type: String,
      required: [true, 'insert elevatorId'],
      index: true,
      unique: true,
    },

    availableFloorNumbers: {
      type: [String],
      required: [true, 'insert availableFloorNumbers'],
      index: true,
    },

    serialNumber: {
      type: String,
      required: false,
    },

    description: {
      type: String,
      required: false,
    },

    model: {
      type: String,
      required: false,
    },

    brand: {
      type: String,
      required: false,
    }
  },
  { timestamps: true },
);

export default mongoose.model<IElevatorPersistence & mongoose.Document>(
  'Elevator',
  Elevator,
);
