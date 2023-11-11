import { Floor } from '../../domain/floor/floor';
import { FloorId } from '../../domain/floor/floorId';

export default interface IFloorRepo {
  save(floor: Floor): Promise<FloorId>;
  findByBuildingId(buildingId: string): Promise<Floor[] | null>;
  findById(id: string): Promise<Floor>
}
