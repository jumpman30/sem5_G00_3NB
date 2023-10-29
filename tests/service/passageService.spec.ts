import mocks from '../mocks';
import PassageService from '../../src/services/passageService';
import IPassageRepo from '../../src/services/IRepos/IPassageRepo';
import { Result } from '../../src/core/logic/Result';
import IFloorRepo from '../../src/services/IRepos/IFloorRepo';
import { PassageDbProjection } from '../../src/types';
import exp = require('constants');

describe('PassageService', () => {
  let passageService: PassageService;
  let mockPassageRepo: jest.Mocked<IPassageRepo>;
  let mockFloorRepo: jest.Mocked<IFloorRepo>;
  let mockLogger: jest.Mocked<Console>;

  beforeEach(() => {
    mockPassageRepo = {
      save: jest.fn(),
      update: jest.fn(),
      find: jest.fn()
    } as any;
    mockFloorRepo = {
      findById: jest.fn()
    } as any;
    mockLogger = {
      error: jest.fn(),
      log: jest.fn()
    } as any;

    passageService = new PassageService(mockPassageRepo,mockFloorRepo, mockLogger);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('save', () => {

    it('should throw an error if it fails to build a floor', async () => {
      const mockPassageDto = mocks.buildPassageDto({
        locationBuilding1: undefined
      });

      try {
        await passageService.save(mockPassageDto);
      } catch (e) {
        expect(e.error).toEqual('locationBuilding1 is null or undefined');
      }
    });

    it(' should call `roomRepo.save`', async () => {
      const mockPassageDto = mocks.buildPassageDto();

      jest.spyOn(mockPassageRepo, 'save').mockResolvedValue('test-id' as any);

      await passageService.save(mockPassageDto);

      expect(mockPassageRepo.save).toHaveBeenCalledTimes(1)
    });
  });

  describe('update', () => {
    it('should call `passageRepo.update()`', async () => {
      jest.spyOn(mockPassageRepo, 'update').mockResolvedValue(1 as any);

      await passageService.update({ test: 'test'} as any, {test: 'test'} as any);

      expect(mockPassageRepo.update).toHaveBeenCalledTimes(1);
      expect(mockPassageRepo.update).toHaveBeenCalledWith({ test: 'test'}, {test: 'test'});
    });

    it('should return fail result if no document is updated', async () => {
      jest.spyOn(mockPassageRepo, 'update').mockResolvedValue(0 as any);

      const result = await passageService.update({ test: 'test'} as any, {test: 'test'} as any);

      expect(result).toEqual(Result.fail('No document was updated'));
    });

    it('should return number of documents updated', async () => {
      jest.spyOn(mockPassageRepo, 'update').mockResolvedValue(1 as any);

      const result = await passageService.update({ test: 'test'} as any, {test: 'test'} as any);

      expect(result).toEqual(Result.ok({updatedCount: 1}));
    });
  });

  describe('findPassageBetweenBuildings', () => {
    it('should call `passageRepo.find() and floorRepo.findById`', async () => {
      const filter = {
        $or: [
          { building1Id: 'testBuilding2Id', building2Id: 'testBuilding1Id' },
          { building2Id: 'testBuilding2Id', building1Id: 'testBuilding1Id' },
        ]
      };
      const projection: PassageDbProjection = { locationBuilding1: 1, locationBuilding2: 1, floor1Id: 1 };

      jest.spyOn(mockPassageRepo, 'find').mockResolvedValue([{floor1Id: 'test-floorId' }] as any);
      jest.spyOn(mockFloorRepo, 'findById').mockResolvedValue([{number: 'test' }] as any);

      await passageService.findPassageBetweenBuildings('testBuilding1Id', 'testBuilding2Id' );

      expect(mockPassageRepo.find).toHaveBeenCalledTimes(1);
      expect(mockPassageRepo.find).toHaveBeenCalledWith(filter, projection);
      expect(mockFloorRepo.findById).toHaveBeenCalledTimes(1);
      expect(mockFloorRepo.findById).toHaveBeenCalledWith('test-floorId');
    });

    it('should return expected result', async () => {

      jest.spyOn(mockPassageRepo, 'find').mockResolvedValue([{locationBuilding1: 'test', locationBuilding2: 'test' }] as any);
      jest.spyOn(mockFloorRepo, 'findById').mockResolvedValue({number: 'test' } as any);

      const result = await passageService.findPassageBetweenBuildings('testBuilding1Id', 'testBuilding2Id');

      expect(result).toEqual(Result.ok([
        {
          locationBuilding1: 'test',
          locationBuilding2: 'test',
          floorNumber: 'test'
        }
      ]));
    });

  });
});
