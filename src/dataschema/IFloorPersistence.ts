import { FloorMap } from "../domain/floorMap";

export interface IFloorPersistence {
  _id: string;
  domainId: string
  buildingId: string;
  floorMap: FloorMap;
  number: string;
}
