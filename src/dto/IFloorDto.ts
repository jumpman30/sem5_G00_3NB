import { FloorMap } from "../domain/floorMap";

export interface IFloorDto {
  domainId: string;
  buildingId: string;
  floorMap: FloorMap,
  number: string;
}
