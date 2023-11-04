import { Repo } from '../../core/infra/Repo';
import { Building } from '../../domain/building/Building';
import { FloorId } from '../../domain/floorId';

export default interface IBuildingRepo extends Repo<Building> {
  save(building: Building): Promise<Building>;
  findByCode(code: string): Promise<Building>;
  exists(building: Building): Promise<boolean>;
  getAllBuildings(): Promise<Building[]>;
}
