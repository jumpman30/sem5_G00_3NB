import FloorRepo from '../../src/repos/floorRepo';
import { Model } from 'mongoose';
import mocks from '../mocks';
import { IFloorPersistence } from '../../src/dataschema/IFloorPersistence';
import PassageRepo from '../../src/repos/passageRepo';
import { IPassagePersistence } from '../../src/dataschema/IPassagePersistence';
import { PassageMap } from '../../src/mappers/PassageMap';



describe('FloorRepo', () => {
  let passageRepo: PassageRepo;
  let mockPassageSchema: jest.Mocked<Model<IPassagePersistence>>;
  let mockLogger: jest.Mocked<Console>;

  beforeEach(() => {
    mockPassageSchema = {
      create: jest.fn(),
      updateOne: jest.fn()
    } as any;
    mockLogger = {
      error: jest.fn(),
      log: jest.fn(),
    } as any;

    passageRepo = new PassageRepo(mockPassageSchema as any, mockLogger);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('save', () => {
    it('should call `passageSchema.create`', async () => {
      const passage = mocks.buildPassage();

      jest.spyOn(mockPassageSchema, 'create').mockResolvedValue({ domainId: 'test-id' } as any);

      await passageRepo.save(passage as any);

      expect(mockPassageSchema.create).toHaveBeenCalledTimes(1);
      expect(mockPassageSchema.create).toHaveBeenCalledWith(PassageMap.toPersistence(passage));
    });
    it('should throw an error if `passageSchema.create` fails', async () => {
      const passage = mocks.buildPassage();

      jest.spyOn(mockPassageSchema, 'create').mockImplementation(() => {
        throw new Error('test-error');
      });

      try {
        await passageRepo.save(passage as any);
      } catch (e){
        expect(e.message).toEqual('test-error');
      }
    });
  });
  describe('update', () => {
    it('should call `passageSchema.updateOne()`', async () => {
      jest.spyOn(mockPassageSchema, 'updateOne').mockResolvedValue({ modifiedCount: 1} as any);

      await passageRepo.update( { floor1Id: 'test-id' }, { domainId: 'test-id' });

      expect(mockPassageSchema.updateOne).toHaveBeenCalledTimes(1);
      expect(mockPassageSchema.updateOne).toHaveBeenCalledWith( { domainId: 'test-id' }, { floor1Id: 'test-id' });
    });

    it('should throw an error if the update fails', async () => {
      jest.spyOn(mockPassageSchema, 'updateOne').mockImplementation(() => {
       throw new Error('test-fail')
      });

      try {
        await passageRepo.update({ }, { });
      } catch (e) {
        expect(e.message).toEqual('test-fail');
      }
    });
  });
});
