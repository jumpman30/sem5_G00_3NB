export interface IUpdatePassageDto {
  building1Id: string;
  building2Id: string;
  floor1Id: string;
  floor2Id: string;
  locationBuilding1: [{ x: string, y: string }];
  locationBuilding2: [{ x: string, y: string }];
}
