import { Result } from '../../core/logic/Result';
import { FloorMap } from '../../domain/floorMap';
import { IFloorDto } from '../../dto/IFloorDto';

export default interface IFloorService {
  save(floorDto: IFloorDto): Promise<Result<{ floorId: string }>>;
  patchFloorMap(floorMap: FloorMap): Promise<Result<IFloorDto>>;
  getFloorsByBuildingId(buildingId: string): Promise<Result<IFloorDto[]>>;
}
