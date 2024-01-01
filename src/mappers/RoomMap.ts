import { Mapper } from '../core/infra/Mapper';
import { Room } from '../domain/room/room';

export class RoomMap extends Mapper<Room> {
  public static toPersistence(room: Room): any {
    return {
      domainId: room.id.toString(),
      buildingId: room.buildingId,
      designation: room.designation,
      doorLocation: room.doorLocation.value,
      floorId: room.floorId,
      location: room.location.value,
    };
  }
}
