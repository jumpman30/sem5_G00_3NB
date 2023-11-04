import { Service, Inject } from 'typedi';
import config from '../../config';
import { Result } from '../core/logic/Result';
import IFloorService from './IServices/IFloorService';
import { IFloorDto } from '../dto/IFloorDto';
import IBuildingService from './IServices/IBuildingService';
import IBuildingRepo from './IRepos/IBuildingRepo';
import { IBuildingDto } from '../dto/IBuildingDto';
import { Building } from '../domain/building';
import { BuildingMap } from '../mappers/BuidingMap';

@Service()
export default class BuildingService implements IBuildingService {
  constructor(
    @Inject(config.repos.building.name) private buildingRepo: IBuildingRepo,
    @Inject('floorService') private floorService: IFloorService,
    @Inject('logger') private logger,
    ) {}

  public async createBuilding(createBuildingDto: ICreateBuildingRequestDto): Promise<Result<ICreateBuildingResponseDto>> {
    try {
      const buildingDto = {...createBuildingDto,} as IBuildingDto;

      console.log(buildingDto)
      const buildingOrError = Building.create(buildingDto);

      if (buildingOrError.isFailure) {
        return Result.fail<ICreateBuildingResponseDto>(buildingOrError.errorValue());
      }

      const buildingResult = buildingOrError.getValue();

      await this.buildingRepo.save(buildingResult);

      const buildingDTOResult = BuildingMap.toResponseDTO(buildingResult) as ICreateBuildingResponseDto;
      return Result.ok<ICreateBuildingResponseDto>(buildingDTOResult)
    } catch (e) {
      throw e;
    }
  }

  public async updateBuilding(buildingDto: IBuildingDto): Promise<Result<IBuildingDto>> {
    try {
      const building = await this.buildingRepo.findByCode(buildingDto.code);

      if (building === null) {
        return Result.fail<IBuildingDto>("Building not found");
      }
      else {
        building.name = buildingDto.name;
        building.length = buildingDto.length;
        building.width = buildingDto.width;
        await this.buildingRepo.save(building);

        const buildingDtoResult = BuildingMap.toDTO(building) as IBuildingDto;
        return Result.ok<IBuildingDto>( buildingDtoResult )
      }
    } catch (e) {
      throw e;
    }
  }

  public async getBuilding( buildingCode: string): Promise<Result<IBuildingDto>> {
    try {
      const building = await this.buildingRepo.findByCode(buildingCode);

      if (building === null) {
        return Result.fail<IBuildingDto>("Building not found");
      }
      else {
        const buildingDtoResult = BuildingMap.toDTO(building) as IBuildingDto;
        return Result.ok<IBuildingDto>( buildingDtoResult )
      }
    } catch (e) {
      throw e;
    }
  }

  public async getAll(): Promise<Result<IBuildingDto[]>> {
    try{
      let building = await this.buildingRepo.getAll();

      if (building === null) {
        return Result.fail("Building not found");
      }
      const buildingDtoResult = building.map(item => BuildingMap.toDTO( item ));

      return Result.ok<IBuildingDto[]>( buildingDtoResult );
    } catch (e) {
      throw e;
    }
  }

  public async save(buildingDto: IBuildingDto): Promise<Result<{ buildingId: string }>> {

    const buildingOrError = Building.create(buildingDto);

    if (buildingOrError.isFailure) {
      throw Result.fail<IBuildingDto>(buildingOrError.errorValue());
    }

    try {
      const buildingId = await this.buildingRepo.save(buildingOrError.getValue());
      return Result.ok<{ buildingId: string }>({ buildingId: buildingId.toString() });

    } catch (e) {
      throw e;
    }
  }

  public async findBuildingByKey(buildingId: string): Promise<Result<IBuildingDto>> {
    try {
        const building = await this.buildingRepo.findByDomainId(buildingId) as Building;

        if (building === null) {
            return Result.fail<IBuildingDto>("Building not found.");
        } else {
            const buildingDTOResult = BuildingMap.toDTO(building) as IBuildingDto;
            return Result.ok<IBuildingDto>(buildingDTOResult)
        }
    } catch (e) {
        throw e;
    }
  }

  public async getBuildingsByMinMax(minFloor: string, maxFloor: string): Promise<Result<IBuildingDto[]>> {
    try {
      const minFloorNumber = parseInt(minFloor, 10);
      const maxFloorNumber = parseInt(maxFloor, 10);

      if (isNaN(minFloorNumber) || isNaN(maxFloorNumber)) {
        return Result.fail<IBuildingDto[]>("Invalid minimum or maximum floor values.");
      }

      const buildings = await this.buildingRepo.getAllBuildings();

      if (buildings.length === 0) {
        return Result.fail<IBuildingDto[]>("No buildings found.");
      }

      const filteredBuildings = [];

      for (const building of buildings) {

        const floors = await this.floorService.getFloorsByBuildingId(building.id.toString());

        if (!floors.isFailure) {
          const numFloors = floors.getValue().length;

          if (numFloors >= minFloorNumber && numFloors <= maxFloorNumber) {
            filteredBuildings.push(building);
          }
        }
      }

      return Result.ok<IBuildingDto[]>(filteredBuildings);
    } catch (e) {
      throw e;
    }
  }

  public async getFloorsByBuildingId(buildingId: string): Promise<Result<IFloorDto[]>> {
    try {

      const building = await this.buildingRepo.findByDomainId(buildingId);

      if (building === null) {
        return Result.fail<IFloorDto[]>("Building not found.");
      } else {

        const floors = await this.floorService.getFloorsByBuildingId(buildingId);

        if (floors.isFailure) {
          return Result.fail<IFloorDto[]>(floors.errorValue());
        }
        const floorDTOs = floors.getValue();
        return Result.ok<IFloorDto[]>(floorDTOs);
      }
    } catch (e) {
      throw e;
    }
  }

  public async getPassageFloors(buildingId: string): Promise<Result<IPassageFloorDto[]>> {
    try{
      let passages = await this.passageRepo.findByBuilding(buildingId);

      if (!passages) {
        return Result.fail("Passages not found");
      }

      let floorsToSearch = passages.map((passage) => {
        if(passage.building1Id === buildingId){
          return passage.floor1Id
        }

        return passage.floor2Id
      })

      let floorsInfo = await Promise.all(floorsToSearch.map(async (floorId) => {
        let floor = await this.floorRepo.findById(floorId);
        return FloorMap.toDto(floor);
      }));

      return Result.ok<IPassageFloorDto[]>( passages.map( passage => PassageMap.toFloorPassageRequestDTO(passage, floorsInfo)) );
    } catch (e) {
      throw e;
    }
  }
}
