export interface IFloorMapPersistence {
  _id: string;
  floorId: string;
  buildingId: string;
  size: object;
  rooms: [object]
  passages: [object]
  elevators: [object]
}
