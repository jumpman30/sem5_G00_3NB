import { Service, Inject } from 'typedi';
import config from '../../config';
import { Result } from '../core/logic/Result';
import IPassageService from './IServices/IPassageService';
import IPassageRepo from './IRepos/IPassageRepo';
import { IPassageDto } from '../dto/IPassageDto';
import { Passage } from '../domain/passage/passage';
import { IUpdatePassageDto } from '../dto/IUpdatePassageDto';
import { PassageDbProjection, UpdateBuildingFilter } from '../types';
import IFloorRepo from './IRepos/IFloorRepo';
import { IPassageBetweenTwoBuildingsDto } from '../dto/IPassageBetweenTwoBuildingsDto';

@Service()
export default class PassageService implements IPassageService {
  constructor(
    @Inject(config.repos.passage.name) private passageRepo: IPassageRepo,
    @Inject(config.repos.floor.name) private floorRepo: IFloorRepo,
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

  public async update(updatePassageDto: IUpdatePassageDto, filter: UpdateBuildingFilter): Promise<Result<{ updatedCount: number }>> {
      const updatedCount = await this.passageRepo.update(updatePassageDto, filter);

      if(updatedCount <= 0){
        return Result.fail('No document was updated');
      }
      return Result.ok({ updatedCount })
  }

  async findPassageBetweenBuildings(searchBuilding1Id: string, searchBuilding2Id: string): Promise<Result<IPassageBetweenTwoBuildingsDto[]>> {
    const filter = {
        $or: [
          { building1Id: searchBuilding2Id, building2Id: searchBuilding1Id },
          { building2Id: searchBuilding2Id, building1Id: searchBuilding1Id },
        ]
      };
    const projection: PassageDbProjection = { locationBuilding1: 1, locationBuilding2: 1, floor1Id: 1 };
    const passages =  await this.passageRepo.find(filter, projection);
    const list: IPassageBetweenTwoBuildingsDto[] = [];

    for (const passage of passages) {
      const { number: floorNumber  } = await this.floorRepo.findById(passage.floor1Id);
      list.push({
        locationBuilding1: passage?.locationBuilding1,
        locationBuilding2: passage?.locationBuilding2,
        floorNumber
      } as unknown as IPassageBetweenTwoBuildingsDto);
    }

    return Result.ok<IPassageBetweenTwoBuildingsDto[]>(list);
  }
}
