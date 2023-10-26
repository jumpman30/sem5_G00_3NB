import { Location } from '../domain/location';

export interface IPassagePersistence {
  _id: string;
  building1Id: string;
  building2Id: string;
  floorId: string;
  //Represents the entrance/exit of the corridor
  //It should only be coordinates of type { x, m-1} being m the width of the building
  locationBuilding1: [Location];
  locationBuilding2: [Location];
}
