import { Result } from '../../core/logic/Result';
import { IFloorDto } from '../../dto/IFloorDto';

export default interface IFloorService {
  save(floorDto: IFloorDto): Promise<Result<{ floorId: string }>>;
  getFloorsByBuildingId(buildingId:string): Promise<Result<IFloorDto[]>>;
}
