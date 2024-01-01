import { FloorMap } from "../domain/floor/floorMap";

export interface IFloorPersistence {
  _id: string;
  domainId: string
  buildingId: string;
  floorMap: FloorMap;
  number: string;
}
