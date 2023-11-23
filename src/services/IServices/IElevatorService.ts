import { Result } from '../../core/logic/Result';
import { Elevator } from '../../domain/elevator/elevator';
import { IElevatorDto } from '../../dto/IElevatorDto';

export default interface IElevatorService {
  createElevator(passageDto: IElevatorDto): Promise<Result<IElevatorDto>>;
  getElevatorsByBuildingId(buildingId: string): Promise<Result<IElevatorDto[]>>;
}
