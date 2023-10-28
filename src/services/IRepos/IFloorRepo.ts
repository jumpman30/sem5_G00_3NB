import { Room } from '../../domain/room';
import { RoomId } from '../../domain/roomId';
import { Floor } from '../../domain/floor';
import { FloorId } from '../../domain/floorId';

export default interface IFloorRepo {
  save(floor: Floor): Promise<FloorId>;
}
