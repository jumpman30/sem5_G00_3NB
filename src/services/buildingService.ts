import { Service, Inject } from 'typedi';
import config from '../../config';
import { Result } from '../core/logic/Result';
import IFloorService from './IServices/IFloorService';
import { IFloorDto } from '../dto/IFloorDto';
import { Floor } from '../domain/floor';
import IFloorRepo from './IRepos/IFloorRepo';
import IBuildingService from './IServices/IBuildingService';
import IBuildingRepo from './IRepos/IBuildingRepo';
import { IBuildingDto } from '../dto/IBuildingDto';
import { Building } from '../domain/building';

@Service()
export default class BuildingService implements IBuildingService {
  constructor(
    @Inject(config.repos.building.name) private buildingRepo: IBuildingRepo,
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
}
