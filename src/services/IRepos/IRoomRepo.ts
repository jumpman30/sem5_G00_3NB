import { Room } from '../../domain/room';
import { RoomId } from '../../domain/roomId';

export default interface IRoomRepo {
  save(room: Room): Promise<RoomId>;
}
