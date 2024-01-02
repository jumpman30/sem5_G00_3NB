import { Service, Inject } from 'typedi';
import config from '../../config';
import { Result } from '../core/logic/Result';
import IFloorService from './IServices/IFloorService';
import { IFloorDto } from '../dto/IFloorDto';
import { Floor } from '../domain/floor/floor';
import IFloorRepo from "../repos/IRepos/IFloorRepo";
import IBuildingService from './IServices/IBuildingService';
import { FloorMap as FloorMapper } from '../mappers/FloorMap';
import { floor } from 'lodash';
import IBuildingRepo from "../repos/IRepos/IBuildingRepo";
import { FloorMap } from '../domain/floor/floorMap';

@Service()
export default class FloorService implements IFloorService {
  constructor(
    @Inject(config.repos.floor.name) private floorRepo: IFloorRepo,
    @Inject(config.repos.building.name) private buildingRepo: IBuildingRepo,
    @Inject('logger') private logger,
  ) {}

  public async patchFloorMap(floorMap: FloorMap): Promise<Result<IFloorDto>> {
    try {
      const floor = await this.floorRepo.findById(floorMap.floorId);
      console.log(floor)
      if (!floor) {
        return Result.fail<IFloorDto>(`Floor with ID ${floorMap.floorId} does not exist.`);
      }

      floor.floorMap = floorMap;

      console.log(floor)
      let floorEdited = await this.floorRepo.editSave(floor);

      return Result.ok<IFloorDto>(FloorMapper.toDTO(floorEdited));

      } catch (e) {
        throw e;
      }
  }

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

  public async getFloorsByBuildingId(buildingId: string): Promise<Result<IFloorDto[]>> {
    try {
      console.log("ehere")
    const buildingExists = await this.buildingRepo.exists(buildingId);

    if (!buildingExists) {
      return Result.fail<IFloorDto[]>(`Building with ID ${buildingId} does not exist.`);
    }

    const floors = await this.floorRepo.findByBuildingId(buildingId);
    console.log(buildingId);
    if (!floors) {
      return Result.fail<IFloorDto[]>(`No floors found for building with ID ${buildingId}.`);
    }
    console.log(floors)
    const floorDTOs = floors.map((floor) => FloorMapper.toDTO(floor));

      return Result.ok<IFloorDto[]>(floorDTOs);
    } catch (e) {
      throw e;
    }
}
}
