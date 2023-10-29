import RoomService from '../../src/services/roomService';
import IRoomRepo from '../../src/services/IRepos/IRoomRepo';
import mocks from '../mocks';
import FloorService from '../../src/services/floorService';
import IFloorRepo from '../../src/services/IRepos/IFloorRepo';
import PassageService from '../../src/services/passageService';
import IPassageRepo from '../../src/services/IRepos/IPassageRepo';

describe('PassageService', () => {
  let passageService: PassageService;
  let mockPassageRepo: jest.Mocked<IPassageRepo>;
  let mockLogger: jest.Mocked<Console>;

  beforeEach(() => {
    mockPassageRepo = {
      save: jest.fn(),
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
});
