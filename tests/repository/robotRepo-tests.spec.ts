import 'reflect-metadata'; 
import RobotTypeRepo from '../../src/repos/robotRepo';
import { Model, Document } from 'mongoose';
import { IRobotPersistence } from '../../src/dataschema/IRobotPersistence';
import { RobotType, RobotTypeProps } from '../../src/domain/RobotType';
import { RobotMap } from '../../src/mappers/RobotMap';
import RobotRepo from '../../src/repos/robotRepo';
import { RobotTypeMap } from '../../src/mappers/RobotTypeMap';
import { Robot } from '../../src/domain/robot/robot';
import { IRobotDTO } from '../../src/dto/IRobotDTO';

// Mock the dependencies
jest.mock('mongoose');
jest.mock('../../src/mappers/RobotMap.ts')

describe('RobotRepo tests ', () => {
  let robotRepo: RobotRepo;
  let mockRobotSchema: Model<IRobotPersistence & Document<any, any, any>>; 

  const validProps: RobotTypeProps = {
    brand: 'brand',
    model: 'Model',
    robotType: 'Type1',
    taskTypes: ['Surveillance', 'PickupAndDelivery'],
  };
  let robotType = RobotType.create(validProps).getValue();

  const robotData =  {
    nickname: "nickname",
    designation: 'Designation1',
    state: true,
    serialNumber: "serialnumber3",
    robotType: robotType,
  } as IRobotDTO;
  

  beforeAll(() => {
    mockRobotSchema = {} as Model<IRobotPersistence & Document<any, any, any>>;
    robotRepo = new RobotRepo(mockRobotSchema);
  });

  it('should save a Robot', async () => {
    const mockRobotDocument = { ...robotType } as unknown as IRobotPersistence & Document<any, any, any>;
    mockRobotSchema.findOne = jest.fn().mockImplementation(() => null);
    mockRobotSchema.create = jest.fn().mockImplementation((robotType) => Promise.resolve("batata"));
    RobotMap.toDomain = jest.fn().mockReturnValue(mockRobotDocument);
    mockRobotDocument.save = jest.fn().mockResolvedValue(mockRobotDocument);

    const savedRobot = await robotRepo.save(Robot.create(robotData).getValue());
    
    expect(savedRobot).toEqual(mockRobotDocument);
  });
 
});
