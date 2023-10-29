import { FloorId } from '../../domain/floorId';
import { Building } from '../../domain/building';

export default interface IBuildingRepo {
  save(building: Building): Promise<FloorId>;
  findByDomainId(buildingId: Building | string): Promise<Building>;
  getAllBuildings(): Promise<Building[]>;
}
