import { Floor } from '../../domain/floor';
import { FloorId } from '../../domain/floorId';

export default interface IFloorRepo {
  save(floor: Floor): Promise<FloorId>;
  findByBuildingId(buildingId: string): Promise<Floor[] | null>;
  findById(id: string): Promise<Floor>
}
