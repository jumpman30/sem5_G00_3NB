
import { Building } from '../../domain/building';
import { BuildingId } from "../../domain/buildingId";
import { IBuildingUpdateDto } from "../../dto/IBuidlingUpdateDto";

export default interface IBuildingRepo {
  save(building: Building): Promise<BuildingId>;
  exists(buildingId: string): Promise<boolean>;
  findByDomainId(buildingId: string): Promise<Building>;
  getAllBuildings(): Promise<Building[]>;
  update(building: Building): Promise<Building>;
}
