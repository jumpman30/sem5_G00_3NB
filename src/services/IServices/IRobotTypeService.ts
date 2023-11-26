import { Result } from '../../core/logic/Result';
import IRobotTypeDto from '../../dto/IRobotTypeDTO';

export default interface IRobotTypeService {
  createRobotType(robotTypeDTO: IRobotTypeDto): Promise<Result<IRobotTypeDto>>;
  getAll(): Promise<Result<IRobotTypeDto[]>>
}
