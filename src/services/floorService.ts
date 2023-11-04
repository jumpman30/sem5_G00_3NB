import { Service, Inject } from 'typedi';
import config from '../../config';
import { Result } from '../core/logic/Result';
import IFloorService from './IServices/IFloorService';
import { IFloorDto } from '../dto/IFloorDto';
import { Floor } from '../domain/floor';
import IFloorRepo from './IRepos/IFloorRepo';
import IBuildingService from './IServices/IBuildingService';
import { FloorMap } from '../mappers/FloorMap';
import { floor } from 'lodash';
import IBuildingRepo from './IRepos/IBuildingRepo';

@Service()
export default class FloorService implements IFloorService {
  constructor(
    @Inject(config.repos.floor.name) private floorRepo: IFloorRepo,
    @Inject(config.repos.building.name) private buildingRepo: IBuildingRepo,
    @Inject('logger') private logger,
  ) {}

  public async save(floorDto: IFloorDto): Promise<Result<{ floorId: string }>> {

    const floorOrError = Floor.create({
      buildingId: floorDto.buildingId,
      number: floorDto.number,
      minimum: floorDto.minimum,
      maximum: floorDto.maximum
    });

    if (floorOrError.isFailure) {
      throw Result.fail<IFloorDto>(floorOrError.errorValue());
    }

    try {
      const floorId = await this.floorRepo.save(floorOrError.getValue());
      return Result.ok<{ floorId: string }>({ floorId: floorId.toString() });
    } catch (e) {
      throw e;
    }
  }

  public async getFloorsByBuildingId(buildingId: string): Promise<Result<IFloorDto[]>> {
    try {
    const buildingExists = await this.buildingRepo.findByDomainId(buildingId);

    if (!buildingExists) {
      return Result.fail<IFloorDto[]>(`Building with ID ${buildingId} does not exist.`);
    }

    const floors = await this.floorRepo.findByBuildingId(buildingId);
    if (!floors) {
      return Result.fail<IFloorDto[]>(`No floors found for building with ID ${buildingId}.`);
    }
    const floorDTOs = floors.map((floor) => FloorMap.toDTO(floor));

      return Result.ok<IFloorDto[]>(floorDTOs);
    } catch (e) {
      throw e;
    }
}
}
