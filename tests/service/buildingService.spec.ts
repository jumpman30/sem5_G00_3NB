import { mock, instance, when, verify, anything } from 'ts-mockito';
import BuildingService from "../../src/services/buildingService";
import IBuildingRepo from "../../src/services/IRepos/IBuildingRepo";
import IFloorRepo from "../../src/services/IRepos/IFloorRepo";
import {IBuildingCreateRequestDto, IBuildingUpdateRequestDto} from "../../src/dto/IBuildingDto";
import {BuildingMap} from "../../src/mappers/BuildingMap";
import IPassageRepo from "../../src/services/IRepos/IPassageRepo";

describe('BuildingService', () => {
  let buildingService: BuildingService;
  let mockedBuildingRepo: IBuildingRepo;
  let mockedFloorRepo: IFloorRepo;
  let mockedPassageRepo: IPassageRepo;

  beforeEach(() => {
    // Mock the repositories and logger
    mockedBuildingRepo = mock<IBuildingRepo>();
    mockedFloorRepo = mock<IFloorRepo>();
    mockedPassageRepo = mock<IPassageRepo>();

    // Create an instance of BuildingService with mocked dependencies
    buildingService = new BuildingService(
        instance(mockedBuildingRepo),
        instance(mockedFloorRepo),
        instance(mockedPassageRepo),
    );
  });

  describe('createBuilding', () => {
    it('should fail if building already exists', async () => {
      const buildingDto: IBuildingCreateRequestDto = {
        code: 'B123',
        name: 'Building 123',
        length: 100,
        width: 100,
      };

      // Mock the findByCode method to simulate an existing building
      when(mockedBuildingRepo.findByCode(buildingDto.code)).thenResolve(BuildingMap.toDomain(buildingDto));

      // Call the createBuilding method
      const result = await buildingService.createBuilding(buildingDto);

      // Assertions
      expect(result.isFailure).toBeTruthy();
      expect(result.errorValue()).toBe('Building already exists');
      verify(mockedBuildingRepo.findByCode(buildingDto.code)).once();
    });

    // Add more tests for different scenarios...
  });

  describe('updateBuilding', () => {
    it('should fail if building is not found', async () => {
      const buildingCode = 'B123';
      const buildingDto: IBuildingUpdateRequestDto = {
        name: 'Updated Building 123',
        length: 150,
        width: 150,
      };

      // Mock the findByCode method to simulate a building not found scenario
      when(mockedBuildingRepo.findByCode(buildingCode)).thenResolve(null);

      // Call the updateBuilding method
      const result = await buildingService.updateBuilding(buildingDto, 'B1');

      // Assertions
      expect(result.isFailure).toBeTruthy();
      expect(result.errorValue()).toBe('Building not found');
    });

    // Add more tests for different scenarios...
  });

  // Add tests for other methods...
});
