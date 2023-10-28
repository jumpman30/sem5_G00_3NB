import { Result } from '../../core/logic/Result';
import { ICreateBuildingDto, IGetBuildingDto } from '../../dto/IBuildingDTO';

export default interface IBuildingService {
  createBuilding(
    BuildingDTO: ICreateBuildingDto,
  ): Promise<Result<IGetBuildingDto>>;
}
