import { Result } from '../../core/logic/Result';
import { IPassageFloorDto } from '../../dto/IPassageFloorDto';
import { IBuildingDto } from "../../dto/IBuildingDto";
import { IBuildingUpdateDto } from "../../dto/IBuidlingUpdateDto";

export default interface IBuildingService {
  save(buildingDto: IBuildingDto): Promise<Result<{ buildingId: string }>>;
  findBuildingByKey(buildingId: string): Promise<Result<IBuildingDto>>;
  getBuildingsByMinMax(minFloor: string, maxFloor: string): Promise<Result<IBuildingDto[]>>;
  getPassageFloors(buildingId: string): Promise<Result<IPassageFloorDto[]>>
  update(buildingDto: IBuildingUpdateDto): Promise<Result<IBuildingDto>>;
  getAllBuildings(): Promise<Result<IBuildingDto[]>>;
}
