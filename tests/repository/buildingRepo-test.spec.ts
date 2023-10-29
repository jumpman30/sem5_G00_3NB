
// Mock the dependencies
import BuildingRepo from "../../src/repos/buildingRepo";
import {Model, Document} from "mongoose";
import {IBuildingPersistence} from "../../src/dataschema/IBuildingPersistence";
import IBuildingDto from "../../src/dto/building/IBuildingDto";
import {BuildingMap} from "../../src/mappers/BuildingMap";
import {Building} from "../../src/domain/building/Building";

jest.mock('mongoose');
jest.mock('../../src/mappers/RobotMap.ts')

describe('BuildingRepo tests ', () => {
  let buildingRepo: BuildingRepo;
  let mockBuildingSchema: Model<IBuildingPersistence & Document<any, any, any>>;

  const buildingData =  {
    code: "B1",
    name: 'Building 1',
    length: 10,
    width: 20,
  } as IBuildingDto;


  beforeAll(() => {
    mockBuildingSchema = {} as Model<IBuildingPersistence & Document<any, any, any>>;
    buildingRepo = new BuildingRepo(mockBuildingSchema);
  });

  it('save a Building', async () => {
    const mockRobotDocument = {} as unknown as IBuildingPersistence & Document<any, any, any>;
    mockBuildingSchema.findOne = jest.fn().mockImplementation(() => null);
    mockBuildingSchema.create = jest.fn().mockImplementation(() => null);
    BuildingMap.toDomain = jest.fn().mockReturnValue(mockRobotDocument);
    mockRobotDocument.save = jest.fn().mockResolvedValue(mockRobotDocument);

    const savedBuilding = await buildingRepo.save(Building.create(buildingData).getValue());

    expect(savedBuilding).toEqual(mockRobotDocument);
  });

});
