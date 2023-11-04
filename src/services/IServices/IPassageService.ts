import { Result } from '../../core/logic/Result';
import { IFloorDto } from '../../dto/IFloorDto';
import { IPassageDto } from '../../dto/IPassageDto';
import { IUpdatePassageDto } from '../../dto/IUpdatePassageDto';
import { UpdateBuildingFilter } from '../../types';

export default interface IPassageService {
  save(passageDto: IPassageDto): Promise<Result<{ passageId: string }>>;
  update(updatePassageDto: IUpdatePassageDto, filter: UpdateBuildingFilter): Promise<Result<{ updatedCount: number }>>;
}
