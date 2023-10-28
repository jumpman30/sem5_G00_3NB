import { Service, Inject } from 'typedi';
import config from '../../config';
import { Result } from '../core/logic/Result';
import IFloorService from './IServices/IFloorService';
import { IFloorDto } from '../dto/IFloorDto';
import { Floor } from '../domain/floor';
import IFloorRepo from './IRepos/IFloorRepo';

@Service()
export default class FloorService implements IFloorService {
  constructor(
    @Inject(config.repos.floor.name) private floorRepo: IFloorRepo,
    @Inject('logger') private logger,
  ) {}

  public async save(floorDto: IFloorDto): Promise<Result<{ floorId: string }>> {

    const floorOrError = Floor.create({
      buildingId: floorDto.buildingId,
      number: floorDto.number
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
}
