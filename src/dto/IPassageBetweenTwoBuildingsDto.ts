export interface IPassageBetweenTwoBuildingsDto {
  locationBuilding1: [{ x: string; y: string }];
  locationBuilding2: [{ x: string; y: string }];
  floorNumber?: string;
}
