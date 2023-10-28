import { Service, Inject } from 'typedi';
import config from '../../config';
import { Result } from '../core/logic/Result';
import IFloorService from './IServices/IFloorService';
import { IFloorDto } from '../dto/IFloorDto';
import { Floor } from '../domain/floor';
import IFloorRepo from './IRepos/IFloorRepo';
import IPassageService from './IServices/IPassageService';
import IPassageRepo from './IRepos/IPassageRepo';
import { IPassageDto } from '../dto/IPassageDto';
import { Passage } from '../domain/passage';

@Service()
export default class PassageService implements IPassageService {
  constructor(
    @Inject(config.repos.passage.name) private passageRepo: IPassageRepo,
    @Inject('logger') private logger,
  ) {}

  public async save(passageDto: IPassageDto): Promise<Result<{ passageId: string }>> {

    const passageOrError = Passage.create({
      building1Id: passageDto.building1Id,
      building2Id: passageDto.building2Id,
      floor1Id: passageDto.floor1Id,
      floor2Id: passageDto.floor2Id,
      locationBuilding1: passageDto.locationBuilding1,
      locationBuilding2: passageDto.locationBuilding2
    });

    if (passageOrError.isFailure) {
      throw Result.fail<IPassageDto>(passageOrError.errorValue());
    }

    try {
      const passageId = await this.passageRepo.save(passageOrError.getValue());
      return Result.ok<{ passageId: string }>({ passageId: passageId.toString() });
    } catch (e) {
      throw e;
    }
  }
}
