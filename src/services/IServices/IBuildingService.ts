import { Result } from '../../core/logic/Result';
import { ICreateBuildingDto, IGetBuildingDto } from '../../dto/IBuildingDTO';
import { IFloorDto } from '../../dto/IFloorDto';
import { IBuildingDto } from '../../dto/IBuildingDto';
import {ICreateBuildingResponseDto} from "../../dto/building/ICreateBuildingResponseDto";

export default interface IBuildingService {
  createBuilding(
    BuildingDTO: ICreateBuildingDto,
  ): Promise<Result<ICreateBuildingResponseDto>>;
  save(buildingDto: IBuildingDto): Promise<Result<{ buildingId: string }>>;
  findBuildingByKey(buildingId: string): Promise<Result<IBuildingDto>>;
  getBuildingsByMinMax(minFloor: string, maxFloor: string): Promise<Result<IBuildingDto[]>>;
}
