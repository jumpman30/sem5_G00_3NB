import { Result } from '../../core/logic/Result';
import { IFloorDto } from '../../dto/IFloorDto';
import { IBuildingDto } from '../../dto/IBuildingDto';

export default interface IBuildingService {
  save(buildingDto: IBuildingDto): Promise<Result<{ buildingId: string }>>;
}
