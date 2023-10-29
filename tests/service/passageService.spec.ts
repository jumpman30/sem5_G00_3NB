import mocks from '../mocks';
import PassageService from '../../src/services/passageService';
import IPassageRepo from '../../src/services/IRepos/IPassageRepo';
import { Result } from '../../src/core/logic/Result';

describe('PassageService', () => {
  let passageService: PassageService;
  let mockPassageRepo: jest.Mocked<IPassageRepo>;
  let mockLogger: jest.Mocked<Console>;

  beforeEach(() => {
    mockPassageRepo = {
      save: jest.fn(),
      update: jest.fn()
    } as any;
    mockLogger = {
      error: jest.fn(),
      log: jest.fn(),
    } as any;

    passageService = new PassageService(mockPassageRepo, mockLogger);
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
});
