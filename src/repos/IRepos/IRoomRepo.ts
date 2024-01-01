import { Room } from '../../domain/room/room';
import { RoomId } from '../../domain/room/roomId';

export default interface IRoomRepo {
  save(room: Room): Promise<RoomId>;
}
