import { Inject, Service } from 'typedi';
import config from '../../config';
import AlreadyExistsException from '../core/infra/AlreadyExistsException';
import { Result } from '../core/logic/Result';

import { IBuildingDto, ICreateBuildingDto, IGetBuildingDto } from '../dto/IBuildingDTO';
import IBuildingRepo from './IRepos/IBuildingRepo';
import IBuildingService from './IServices/IBuildingService';

import { Building } from '../domain/Building';
import { BuildingMap } from '../mappers/BuildingMap';
import { BuildingCode } from '../domain/BuildingCode';
//import { IBuildingDto } from '../dto/IBuildingDTO';

@Service()
export default class BuildingService implements IBuildingService {
  constructor(
    @Inject(config.repos.building.name)
    private buildingRepo: IBuildingRepo,
  ) {}

  public async createBuilding(
    buildingDTO: ICreateBuildingDto,
  ): Promise<Result<IGetBuildingDto>> {
    try {
      //validate Dto
      const buildingCodeOrError = BuildingCode.create(buildingDTO.code);
      if (buildingCodeOrError.isFailure) {
        return Result.fail<IGetBuildingDto>(buildingCodeOrError.errorValue());
      }

      const buildingOrError = Building.create(buildingDTO);
      if (buildingOrError.isFailure) {
        return Result.fail<IGetBuildingDto>(buildingOrError.errorValue());
      }
      //validate if building alredy exists
      const buildingResult = buildingOrError.getValue();
      if (await this.buildingRepo.exists(buildingResult)) {
        throw new AlreadyExistsException('Building already exists');
      }
      //save to db
      await this.buildingRepo.save(buildingResult);

      const buildingDTOResult = BuildingMap.toDTO( buildingResult, ) as IBuildingDto;

      return Result.ok<IBuildingDto>(buildingDTOResult);
    } catch (e) {
      throw e;
    }
  }
}
