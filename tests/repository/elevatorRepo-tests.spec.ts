import "reflect-metadata"; 
import ElevatorRepo from "../../src/repos/elevatorRepo";
import { Model, Document } from "mongoose";
import { IRobotTypePersistence } from "../../src/dataschema/IRobotTypePersistence";
import { RobotType, RobotTypeProps } from "../../src/domain/RobotType";
import { ElevatorMap } from "../../src/mappers/ElevatorMap";
import { IElevatorPersistence } from "../../src/dataschema/IElevatorPersistence";
import { Elevator } from "../../src/domain/elevator/elevator";

// Mock the dependencies
jest.mock("mongoose");
jest.mock("../../src/mappers/ElevatorMap.ts")

describe("ElevatorRepo tests", () => {
  let elevatorRepo: ElevatorRepo;
  let mockElevatorSchema: Model<IElevatorPersistence & Document<any, any, any>>; // Ensure the Document type is compatible

  const validElevatorDto = {
    buildingId: "building1",
    elevatorId: "elevator1",
    availableFloorNumbers: ["1", "2", "3"],
    serialNumber: "Elevator123",
    description: "Elevator Description",
    model: "Model123",
    brand: "Brand123",
  };

  const validElevator = Elevator.create(validElevatorDto).getValue();

  beforeAll(() => {
    // Create an instance of the RobotTypeRepo
    mockElevatorSchema = {} as Model<IElevatorPersistence & Document<any, any, any>>;
    elevatorRepo = new ElevatorRepo(mockElevatorSchema);
  });

  it("should save an elevator", async () => {
    const mockElevatorDocument = { ...validElevatorDto } as unknown as IElevatorPersistence & Document<any, any, any>;
    mockElevatorSchema.findOne = jest.fn().mockImplementation(() => null);
    mockElevatorSchema.create = jest.fn().mockImplementation((validElevator) => Promise.resolve("batata"));
    ElevatorMap.toDomain = jest.fn().mockReturnValue(mockElevatorDocument);
    mockElevatorDocument.save = jest.fn().mockResolvedValue(mockElevatorDocument);

    const savedRobotType = await elevatorRepo.save(validElevator);
    
    expect(savedRobotType).toEqual(mockElevatorDocument);
  });
 
});
