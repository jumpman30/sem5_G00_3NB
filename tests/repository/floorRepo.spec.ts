import FloorRepo from '../../src/repos/floorRepo';
import { Model } from 'mongoose';
import mocks from '../mocks';
import { IFloorPersistence } from '../../src/dataschema/IFloorPersistence';



describe('FloorRepo', () => {
  let floorRepo: FloorRepo;
  let mockFloorSchema: jest.Mocked<Model<IFloorPersistence>>;
  let mockLogger: jest.Mocked<Console>;

  beforeEach(() => {
    mockFloorSchema = {
      create: jest.fn(),
    } as any;
    mockLogger = {
      error: jest.fn(),
      log: jest.fn(),
    } as any;

    floorRepo = new FloorRepo(mockFloorSchema as any, mockLogger);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('save', () => {
    it('should call `floorSchema.create`', async () => {
      const floor = mocks.buildFloor();

      jest.spyOn(mockFloorSchema, 'create').mockResolvedValue({ domainId: 'test-id' } as any);

      await floorRepo.save(floor as any);

      expect(mockFloorSchema.create).toHaveBeenCalledTimes(1);
      expect(mockFloorSchema.create).toHaveBeenCalledWith({
        domainId: floor.id.toString(),
        buildingId: floor.buildingId,
        number: floor.number
      });
    });
    it('should throw an error if `floorSchema.create` fails', async () => {
      const floor = mocks.buildFloor();


      jest.spyOn(mockFloorSchema, 'create').mockImplementation(() => {
        throw new Error('test-error');
      });

      try {
        await floorRepo.save(floor as any);
      } catch (e){
        expect(e.message).toEqual('test-error');
      }
    });
  });
});
