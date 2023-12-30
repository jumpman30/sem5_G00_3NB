import { IRoomDto } from '../../dto/IRoomDto';
import { Result } from '../../core/logic/Result';

export default interface IRoomService {
  save(roomDto: IRoomDto): Promise<Result<{ roomId: string }>>;
}
