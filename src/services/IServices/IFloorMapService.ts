import { Result } from '../../core/logic/Result';
import { FloorMap } from '../../domain/floorMap';
import { IFloorDto } from '../../dto/IFloorDto';

export default interface IFloorMapService {
  save(floorMap: FloorMap): Promise<Result<FloorMap>>;
  getAll(): Promise<FloorMap[]>;
}
