import { Result } from '../../core/logic/Result';
import { FloorMap } from '../../domain/floorMap';
import { IFloorDto } from '../../dto/IFloorDto';

export default interface IFloorService {
  save(floorDto: IFloorDto): Promise<Result<{ floorId: string }>>;
  getFloorsByBuildingId(buildingId:string): Promise<Result<IFloorDto[]>>;
  patchFloorMap(floorMap: FloorMap): Promise<Result<IFloorDto>>
}
