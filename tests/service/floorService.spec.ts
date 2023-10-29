import RoomService from '../../src/services/roomService';
import IRoomRepo from '../../src/services/IRepos/IRoomRepo';
import mocks from '../mocks';
import FloorService from '../../src/services/floorService';
import IFloorRepo from '../../src/services/IRepos/IFloorRepo';
import BuildingService from '../../src/services/buildingService';

describe('FloorService', () => {
  let floorService: FloorService;
  let buildingService: BuildingService;
  let mockFloorRepo: jest.Mocked<IFloorRepo>;
  let mockLogger: jest.Mocked<Console>;

  beforeEach(() => {
    mockFloorRepo = {
      save: jest.fn(),
    } as any;
    mockLogger = {
      error: jest.fn(),
      log: jest.fn(),
    } as any;
    buildingService= {
      save: jest.fn(),
    } as any;

    floorService = new FloorService(mockFloorRepo,buildingService, mockLogger);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('save', () => {

    it('should throw an error if it fails to build a floor', async () => {
      const mockFloorDto = mocks.buildFloorDto({
        buildingId: undefined
      });

      try {
        await floorService.save(mockFloorDto);
      } catch (e) {
        expect(e.error).toEqual('buildingId is null or undefined');
      }
    });

    it(' should call `roomRepo.save`', async () => {
      const mockFloorDto = mocks.buildFloorDto();

      jest.spyOn(mockFloorRepo, 'save').mockResolvedValue('test-id' as any);

      await floorService.save(mockFloorDto);

      expect(mockFloorRepo.save).toHaveBeenCalledTimes(1)
    });
  });
});
