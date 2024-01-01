import mocks from "../mocks";
import BuildingService from "../../src/services/buildingService";
import FloorService from "../../src/services/floorService";
import IBuildingRepo from "../../src/repos/IRepos/IBuildingRepo";
import IPassageRepo from "../../src/repos/IRepos/IPassageRepo";
import IFloorRepo from "../../src/repos/IRepos/IFloorRepo";
import { PassageMap } from "../../src/mappers/PassageMap";

describe('BuildingService', () => {
  let buildingService: BuildingService;
  let floorService: FloorService;
  let mockBuildingRepo: jest.Mocked<IBuildingRepo>;
  let mockPassageRepo: jest.Mocked<IPassageRepo>;
  let mockFloorRepo: jest.Mocked<IFloorRepo>;
  let mockLogger: jest.Mocked<Console>;

  beforeEach(() => {
    mockBuildingRepo = {
      save: jest.fn(),
    } as any;
    mockPassageRepo = {
      findByBuilding: jest.fn(),
    } as any;
    mockFloorRepo = {
      findById: jest.fn(),
    } as any;
    mockLogger = {
      error: jest.fn(),
      log: jest.fn(),
    } as any;
    floorService= {
      save: jest.fn(),
    } as any;

    buildingService = new BuildingService(mockBuildingRepo,floorService,mockPassageRepo,mockFloorRepo, mockLogger);
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
  });

  it('should throw an error if it fails to find passages for a building', async () => {
      mockPassageRepo.findByBuilding=jest.fn().mockImplementation((buildingId) => Promise.resolve());

      const result = await buildingService.getPassageFloors("id");

    expect(result.isFailure).toBeTruthy()
  });

  it('should call passageRepo.findByBuilding and passageRepo.findById to find passages for a building', async () => {
    mockPassageRepo.findByBuilding=jest.fn().mockImplementation((buildingId) => Promise.resolve([{"_id":{"value":"48825069-3590-47a1-8b0e-260610207c16"},"props":{"_id":"653e4648fb075170fafc9c5e","domainId":"48825069-3590-47a1-8b0e-260610207c16","building1Id":"LEI","building2Id":"LEC","floor1Id":"6426a035-02d0-4c50-bdff-aaa5cb6e971d","floor2Id":"18ef4495-b52c-4dfb-9fe6-e583ee389a7a","locationBuilding1":[],"locationBuilding2":[],"createdAt":"2023-10-29T11:47:20.559Z","updatedAt":"2023-10-29T11:47:20.559Z","__v":0},"_domainEvents":[]},{"_id":{"value":"16c99fb2-66f2-4b0b-9d99-e7d6396185b4"},"props":{"_id":"653e46a9fb075170fafc9c66","domainId":"16c99fb2-66f2-4b0b-9d99-e7d6396185b4","building1Id":"DEI","building2Id":"LEI","floor1Id":"36599468-ca33-4675-9c94-06986f9597eb","floor2Id":"6426a035-02d0-4c50-bdff-aaa5cb6e971d","locationBuilding1":[],"locationBuilding2":[],"createdAt":"2023-10-29T11:48:57.117Z","updatedAt":"2023-10-29T11:48:57.117Z","__v":0},"_domainEvents":[]}]));
    PassageMap.toFloorPassageRequestDTO = jest.fn();
    await buildingService.getPassageFloors("id");

    expect(mockPassageRepo.findByBuilding).toHaveBeenCalledTimes(1)
    expect(mockFloorRepo.findById).toHaveBeenCalledTimes(2)

  });
});
