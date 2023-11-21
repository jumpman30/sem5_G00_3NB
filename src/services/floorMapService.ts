import { Service, Inject } from 'typedi';
import config from '../../config';
import { Result } from '../core/logic/Result';
import IFloorMapService from './IServices/IFloorMapService';
import IFloorMapRepo from './IRepos/IFloorMapRepo';
import { FloorMap } from '../domain/floorMap';

@Service()
export default class FloorMapService implements IFloorMapService {
  constructor(
    @Inject(config.repos.floorMap.name) private floorMapRepo: IFloorMapRepo,
  ) {}


  public async getAll(): Promise<FloorMap[]> {
    let redsda = await this.floorMapRepo.findAll();
    console.log(redsda)
    return redsda
  }

  public async save(floorMap: FloorMap): Promise<Result<FloorMap>> {

    const floorOrError = FloorMap.create({
      buildingId: floorMap.buildingId,
      floorId: floorMap.floorId,
      size: floorMap.size,
      rooms: floorMap.rooms,
      passages: floorMap.passages,
      elevators: floorMap.elevators
    });

    if (floorOrError.isFailure) {
      throw Result.fail<FloorMap>(floorOrError.errorValue());
    }

    try {
      const floorMap = await this.floorMapRepo.save(floorOrError.getValue());
      return Result.ok<FloorMap>(floorMap);
    } catch (e) {
      throw e;
    }
  }
}
