import { Result } from '../../core/logic/Result';
import { IFloorDto } from '../../dto/IFloorDto';
import { IPassageDto } from '../../dto/IPassageDto';

export default interface IPassageService {
  save(passageDto: IPassageDto): Promise<Result<{ passageId: string }>>;
}
