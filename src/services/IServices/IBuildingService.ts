import { Result } from '../../core/logic/Result';
import IBuildingDto, {
  IBuildingCreateRequestDto,
  IBuildingResponseDto,
  IBuildingUpdateRequestDto
} from "../../dto/IBuildingDto";
import { IPassageFloorDto } from '../../dto/IPassageFloorDto';

export default interface IBuildingService {
  createBuilding(buildingDTO: IBuildingCreateRequestDto): Promise<Result<IBuildingResponseDto>>;
  updateBuilding(buildingDTO: IBuildingUpdateRequestDto, buildingCode: string): Promise<Result<IBuildingResponseDto>>;
  save(buildingDto: IBuildingDto): Promise<Result<{ buildingCode: string }>>;
  findBuildingByCode(buildingCode: string): Promise<Result<IBuildingDto>>;
  getBuildingsByMinMax(minFloor: string, maxFloor: string): Promise<Result<IBuildingDto[]>>;
  getPassageFloors(buildingCode: string): Promise<Result<IPassageFloorDto[]>>;
  getAllBuildings(): Promise<Result<IBuildingDto[]>>;
}
