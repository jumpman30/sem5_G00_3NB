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
    @Inject('logger') private logger,
    @Inject('floorService') private floorService: IFloorService
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
            return Result.fail<IBuildingDto>("Truck not found.");
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
      // Once you have the building, you can call the FloorService to get the floors
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

}
