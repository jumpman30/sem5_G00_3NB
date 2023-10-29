import { IFloorDto } from "./IFloorDto";

export interface IPassageFloorDto {
  building1Id: string;
  building2Id: string;
  floor: IFloorDto;
  //Represents the entrance/exit of the passage
  //It should only be coordinates of type { x, m-1} being m the width of the building
  locationBuilding1: [{ x: string; y: string }];
  locationBuilding2: [{ x: string; y: string }];
}
