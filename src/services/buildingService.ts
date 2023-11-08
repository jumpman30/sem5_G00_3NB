import { Service, Inject } from 'typedi';
import config from '../../config';
import { Result } from '../core/logic/Result';
import IBuildingService from './IServices/IBuildingService';
import IBuildingRepo from './IRepos/IBuildingRepo';
import IBuildingDto, {
  IBuildingCreateRequestDto,
  IBuildingResponseDto,
  IBuildingUpdateRequestDto
} from '../dto/IBuildingDto';
import { Building } from '../domain/building/Building';
import { BuildingMap } from '../mappers/BuildingMap';
import {FloorMap} from "../mappers/FloorMap";
import {IPassageFloorDto} from "../dto/IPassageFloorDto";
import IFloorRepo from "./IRepos/IFloorRepo";
import {PassageMap} from "../mappers/PassageMap";
import IPassageRepo from "./IRepos/IPassageRepo";

@Service()
export default class BuildingService implements IBuildingService {
  constructor(
    @Inject(config.repos.building.name) private buildingRepo: IBuildingRepo,
    @Inject(config.repos.floor.name) private floorRepo: IFloorRepo,
    @Inject(config.repos.passage.name) private passageRepo: IPassageRepo,
    ) {}

  public async createBuilding(createBuildingDto: IBuildingCreateRequestDto): Promise<Result<IBuildingResponseDto>> {
    try {

      if(await this.buildingRepo.findByCode(createBuildingDto.code) !== null){
        return Result.fail<IBuildingResponseDto>("Building already exists");
      }

      const buildingDto = {...createBuildingDto,} as IBuildingDto;
      const buildingOrError = Building.create(buildingDto);

      if (buildingOrError.isFailure) {
        return Result.fail<IBuildingResponseDto>(buildingOrError.errorValue());
      }

      const buildingResult = buildingOrError.getValue();

      await this.buildingRepo.save(buildingResult);

      const buildingDTOResult = BuildingMap.toResponseDTO(buildingResult) as IBuildingResponseDto;
      return Result.ok<IBuildingResponseDto>(buildingDTOResult)
    } catch (e) {
      throw e;
    }
  }

  public async updateBuilding(buildingDto: IBuildingUpdateRequestDto, code: string): Promise<Result<IBuildingResponseDto>> {
    try {
      const building = await this.buildingRepo.findByCode(code);

      if (building === null) {
        return Result.fail<IBuildingResponseDto>("Building not found");
      }
      else {
        const buildingOrError = Building.update(
          {
            name: buildingDto.name ?? building.name,
            length: buildingDto.length ?? building.length,
            width: buildingDto.width ?? building.width,
          },
          building.code,
        );

        if (buildingOrError.isFailure) {
          return Result.fail<IBuildingResponseDto>(buildingOrError.errorValue());
        }

        const updatedBuilding = await this.buildingRepo.save(building);

        const buildingDtoResult = BuildingMap.toDTO(updatedBuilding) as IBuildingDto;
        return Result.ok<IBuildingResponseDto>( buildingDtoResult )
      }
    } catch (e) {
      throw e;
    }
  }


  public async save(buildingDto: IBuildingDto): Promise<Result<{ buildingCode: string }>> {

    const buildingOrError = Building.create(buildingDto);

    if (buildingOrError.isFailure) {
      throw Result.fail<IBuildingDto>(buildingOrError.errorValue());
    }

    try {
      const buildingId = await this.buildingRepo.save(buildingOrError.getValue());
      return Result.ok<{ buildingCode: string }>({ buildingCode: buildingId.toString() });

    } catch (e) {
      throw e;
    }
  }

  public async findBuildingByCode(buildingCode: string): Promise<Result<IBuildingDto>> {
    try {
        const building = await this.buildingRepo.findByCode(buildingCode) as Building;

        if (building === null) {
            return Result.fail<IBuildingResponseDto>("Building not found.");
        } else {
            const buildingDTOResult = BuildingMap.toDTO(building) as IBuildingDto;
            return Result.ok<IBuildingResponseDto>(buildingDTOResult)
        }
    } catch (e) {
        throw e;
    }
  }

  public async getBuildingsByMinMax(minFloor: string, maxFloor: string): Promise<Result<IBuildingResponseDto[]>> {
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

        const floors = await this.floorRepo.findByBuildingId(building.id.toString());

        if (!floors) {
          const numFloors = floors.length;

          if (numFloors >= minFloorNumber && numFloors <= maxFloorNumber) {
            filteredBuildings.push(building);
          }
        }
      }

      return Result.ok<IBuildingResponseDto[]>(filteredBuildings);
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
  public async getAllBuildings(): Promise<Result<IBuildingDto[]>> {

    const buildings = await this.buildingRepo.getAllBuildings();

    if (buildings === null) {
      return Result.fail<IBuildingResponseDto []>("No building found");
    } else {
      const buildingDtoResult = buildings.map((building) => BuildingMap.toDTO(building));
      return Result.ok<IBuildingResponseDto []>(buildingDtoResult)

    }
  }
}
