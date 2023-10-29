export interface IPassageDto {
  building1Id: string;
  building2Id: string;
  floor1Id: string;
  floor2Id: string;
  //Represents the entrance/exit of the passage
  //It should only be coordinates of type { x, m-1} being m the width of the building
  locationBuilding1: [{ x: string; y: string }];
  locationBuilding2: [{ x: string; y: string }];
}
