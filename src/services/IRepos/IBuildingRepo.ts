import { Repo } from '../../core/infra/Repo';
import { Building } from '../../domain/building/Building';
import { FloorId } from '../../domain/floorId';

export default interface IBuildingRepo extends Repo<Building> {
  save(user: Building): Promise<Building>;
  findByCode(code: string): Promise<Building>;
  getAll(): Promise<Building[]>;
  save(building: Building): Promise<FloorId>;
  findByDomainId(buildingId: Building | string): Promise<Building>;
  getAllBuildings(): Promise<Building[]>;
}
