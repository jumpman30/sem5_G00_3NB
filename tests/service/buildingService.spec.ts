import RoomService from '../../src/services/roomService';
import IRoomRepo from '../../src/services/IRepos/IRoomRepo';
import mocks from '../mocks';
import FloorService from '../../src/services/floorService';
import IFloorRepo from '../../src/services/IRepos/IFloorRepo';
import BuildingService from '../../src/services/buildingService';
import IBuildingRepo from '../../src/services/IRepos/IBuildingRepo';

describe('BuildingService', () => {
  let buildingService: BuildingService;
  let mockBuildingRepo: jest.Mocked<IBuildingRepo>;
  let mockLogger: jest.Mocked<Console>;

  beforeEach(() => {
    mockBuildingRepo = {
      save: jest.fn(),
    } as any;
    mockLogger = {
      error: jest.fn(),
      log: jest.fn(),
    } as any;

    buildingService = new BuildingService(mockBuildingRepo, mockLogger);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('save', () => {

    it('should throw an error if it fails to build a building', async () => {

      try {
        await buildingService.save(mocks.buildBuildingDto({
          length: undefined
        }));
      } catch (e) {
        expect(e.error).toEqual('length is null or undefined');
      }
    });

    it(' should call `buildingRepo.save`', async () => {
      const mockBuildDto = mocks.buildBuildingDto();

      jest.spyOn(mockBuildingRepo, 'save').mockResolvedValue('test-id' as any);

      await buildingService.save(mockBuildDto);

      expect(mockBuildingRepo.save).toHaveBeenCalledTimes(1)
    });
  });
});
