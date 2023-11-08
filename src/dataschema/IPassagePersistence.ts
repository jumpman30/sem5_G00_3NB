import { Location } from '../domain/room/location';

export interface IPassagePersistence {
  _id: string;
  domainId: string
  building1Id: string;
  building2Id: string;
  floor1Id: string;
  floor2Id: string;
  //Represents the entrance/exit of the corridor
  //It should only be coordinates of type { x, m-1} being m the width of the building
  locationBuilding1: [{ x: string; y: string }];
  locationBuilding2: [{ x: string; y: string }];
}
