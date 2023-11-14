import { Result } from '../../core/logic/Result';
import { IBuildingDto } from '../../dto/IBuildingDto';
import { IPassageDto } from '../../dto/IPassageDto';
import { IPassageFloorDto } from '../../dto/IPassageFloorDto';

export default interface IBuildingService {
  save(buildingDto: IBuildingDto): Promise<Result<{ buildingId: string }>>;
  findBuildingByKey(buildingId: string): Promise<Result<IBuildingDto>>;
  getBuildingsByMinMax(minFloor: string, maxFloor: string): Promise<Result<IBuildingDto[]>>;
  getPassageFloors(buildingId: string): Promise<Result<IPassageFloorDto[]>>
}
