import 'reflect-metadata'; 
import RobotTypeRepo from '../../src/repos/robotTypeRepo';
import { Model, Document } from 'mongoose';
import { IRobotTypePersistence } from '../../src/dataschema/IRobotTypePersistence';
import { RobotType, RobotTypeProps } from '../../src/domain/RobotType';
import { RobotTypeMap } from '../../src/mappers/RobotTypeMap';

// Mock the dependencies
jest.mock('mongoose');
jest.mock('../../src/mappers/RobotTypeMap.ts')

describe('RobotTypeRepo tests', () => {
  let robotTypeRepo: RobotTypeRepo;
  let mockRobotTypeSchema: Model<IRobotTypePersistence & Document<any, any, any>>; // Ensure the Document type is compatible

  const validProps: RobotTypeProps = {
    brand: 'Brand',
    model: 'Model',
    robotType: 'Type1',
    taskTypes: ['Surveillance', 'PickupAndDelivery'],
  };
  let robotType = RobotType.create(validProps).getValue();

  beforeAll(() => {
    // Create an instance of the RobotTypeRepo
    mockRobotTypeSchema = {} as Model<IRobotTypePersistence & Document<any, any, any>>;
    robotTypeRepo = new RobotTypeRepo(mockRobotTypeSchema);
  });

  it('should check if a RobotType exists', async () => {
    // Mock findOne to return a RobotTypeDocument
    const mockRobotTypeDocument = robotType;
    mockRobotTypeSchema.findOne = jest.fn().mockImplementation(() => mockRobotTypeDocument);

    const exists = await robotTypeRepo.exists(robotType);

    expect(exists).toBe(true);
  });

  it('should save a RobotType', async () => {
    const mockRobotTypeDocument = { ...robotType } as unknown as IRobotTypePersistence & Document<any, any, any>;
    mockRobotTypeSchema.findOne = jest.fn().mockImplementation(() => null);
    mockRobotTypeSchema.create = jest.fn().mockImplementation((robotType) => Promise.resolve("batata"));
    RobotTypeMap.toDomain = jest.fn().mockReturnValue(mockRobotTypeDocument);
    mockRobotTypeDocument.save = jest.fn().mockResolvedValue(mockRobotTypeDocument);

    const savedRobotType = await robotTypeRepo.save(robotType);
    
    expect(savedRobotType).toEqual(mockRobotTypeDocument);
  });
 
});
