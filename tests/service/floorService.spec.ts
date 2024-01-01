import mocks from "../mocks";
import FloorService from "../../src/services/floorService";
import IFloorRepo from "../../src/repos/IRepos/IFloorRepo";
import IBuildingRepo from "../../src/repos/IRepos/IBuildingRepo";

describe('FloorService', () => {
  let floorService: FloorService;
  let buildingRepo: IBuildingRepo;
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
    buildingRepo= {
      save: jest.fn(),
    } as any;

    floorService = new FloorService(mockFloorRepo,buildingRepo, mockLogger);
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
