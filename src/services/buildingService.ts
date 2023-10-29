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

  public async save(buildingDto: IBuildingDto): Promise<Result<{ buildingId: string }>> {

    const buildingOrError = Building.create({
      designation: buildingDto.designation,
      width: buildingDto.width,
      length: buildingDto.length
    });

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
        const building = await this.buildingRepo.findByDomainId(buildingId);

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
}
