import { Location } from '../domain/room/location';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';

export interface IRoomPersistence {
  _id: string;
  buildingId: string;
  designation: string;
  //These are the coordinates of the door considering the floor is a mxn matrix
  doorLocation: { x: string; y: string };
  floorId: string;
  //These are the top loft coordinates in which the building is located.
  //To then calculate the space occupied by the room we use
  //these coordinates along with the measure (m and n) of the building.
  //TODO: should we instead use an array that contains all the cells the building occupies?
  location: { x: string; y: string };
}
