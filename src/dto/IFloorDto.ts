import { FloorMap } from "../domain/floor/floorMap";

export interface IFloorDto {
  domainId: string;
  buildingId: string;
  floorMap: FloorMap;
  number: string;
}
