import { FloorMap } from "../../domain/floorMap";

export default interface IFloorMapRepo {
  save(floorMap: FloorMap): Promise<FloorMap>;
  findAll(): Promise<FloorMap[] | null>;
}
