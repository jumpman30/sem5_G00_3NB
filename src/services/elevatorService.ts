import { Service, Inject } from 'typedi';
import config from '../../config';
import { Result } from '../core/logic/Result';
import { IFloorDto } from '../dto/IFloorDto';
import IBuildingRepo from './IRepos/IBuildingRepo';
import IElevatorService from './IServices/IElevatorService';
import { IElevatorDto } from '../dto/IElevatorDto';
import { Elevator } from '../domain/elevator/elevator';
import IElevatorRepo from './IRepos/IElevatorRepo';
import { ElevatorMap } from '../mappers/ElevatorMap';

@Service()
export default class ElevatorService implements IElevatorService {
  constructor(
    @Inject(config.repos.elevator.name) private elevatorRepo: IElevatorRepo,
    @Inject(config.repos.building.name) private buildingRepo: IBuildingRepo,
  ) {}

  public async createElevator(elevatorDto: IElevatorDto): Promise<Result<IElevatorDto>> {

    if(!await this.buildingRepo.exists(await this.buildingRepo.findByCode(elevatorDto.buildingId))){
      return Result.fail<IElevatorDto>("Building does not exist.")
    }
    let elevatorSequencialId = await this.elevatorRepo.countByBuilding(elevatorDto.buildingId);

    const elevatorOrError = Elevator.create({...elevatorDto, elevatorId: `${elevatorSequencialId++}`});

    if (elevatorOrError.isFailure) {
      return Result.fail<IElevatorDto>(elevatorOrError.errorValue());
    }

    try {
      const elevator = await this.elevatorRepo.save(elevatorOrError.getValue());

      return Result.ok<IElevatorDto>(ElevatorMap.toDTO(elevator));
    } catch (e) {
      throw e;
    }
  }

}
