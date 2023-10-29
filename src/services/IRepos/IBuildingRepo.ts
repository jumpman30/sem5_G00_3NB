import { Building } from '../../domain/building/Building';

export default interface IBuildingRepo {
  save(user: Building): Promise<Building>;
  findByDomainId(buildingId: Building | string): Promise<Building>;
  getAllBuildings(): Promise<Building[]>;
  findByCode(code: string): Promise<Building>;
  getAll(): Promise<Building[]>;
}
