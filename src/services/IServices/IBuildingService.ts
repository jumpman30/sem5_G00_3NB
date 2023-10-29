import { Result } from '../../core/logic/Result';
import { IFloorDto } from '../../dto/IFloorDto';
import { IBuildingDto } from '../../dto/IBuildingDto';

export default interface IBuildingService {
  save(buildingDto: IBuildingDto): Promise<Result<{ buildingId: string }>>;
  findBuildingByKey(buildingId: string): Promise<Result<IBuildingDto>>;
  getBuildingsByMinMax(minFloor: string, maxFloor: string): Promise<Result<IBuildingDto[]>>;
}
