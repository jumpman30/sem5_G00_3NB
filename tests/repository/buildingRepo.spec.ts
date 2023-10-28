import FloorRepo from '../../src/repos/floorRepo';
import { Model } from 'mongoose';
import mocks from '../mocks';
import { IFloorPersistence } from '../../src/dataschema/IFloorPersistence';
import BuildingRepo from '../../src/repos/buildingRepo';
import { IBuildingPersistence } from '../../src/dataschema/IBuildingPersistence';



describe('BuildingRepo', () => {
  let buildingRepo: BuildingRepo;
  let mockBuildingSchema: jest.Mocked<Model<IBuildingPersistence>>;
  let mockLogger: jest.Mocked<Console>;

  beforeEach(() => {
    mockBuildingSchema = {
      create: jest.fn(),
    } as any;
    mockLogger = {
      error: jest.fn(),
      log: jest.fn(),
    } as any;

    buildingRepo = new BuildingRepo(mockBuildingSchema as any, mockLogger);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('save', () => {
    it('should call `floorSchema.create`', async () => {
      const building = mocks.buildBuilding();

      jest.spyOn(mockBuildingSchema, 'create').mockResolvedValue({ domainId: 'test-id' } as any);

      await buildingRepo.save(building as any);

      expect(mockBuildingSchema.create).toHaveBeenCalledTimes(1);
      expect(mockBuildingSchema.create).toHaveBeenCalledWith({
        domainId: building.id.toString(),
        designation: building.designation,
        length: building.length,
        width: building.width,
      });
    });
    it('should throw an error if `floorSchema.create` fails', async () => {
      const building = mocks.buildBuilding();


      jest.spyOn(mockBuildingSchema, 'create').mockImplementation(() => {
        throw new Error('test-error');
      });

      try {
        await buildingRepo.save(building as any);
      } catch (e){
        expect(e.message).toEqual('test-error');
      }
    });
  });
});
