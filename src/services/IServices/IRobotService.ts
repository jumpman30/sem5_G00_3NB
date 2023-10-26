import { Result } from "../../core/logic/Result";
import { IRobotDTO } from "../../dto/IRobotDTO";
export default interface IRobotService {
  createRobot(robotDTO: IRobotDTO): Promise<Result<IRobotDTO>>;
  updateRobot(robotDTO: IRobotDTO): Promise<Result<IRobotDTO>>;
  inactivateRobot(nickname: string): Promise<Result<IRobotDTO>>;
  activateRobot(nickname: string): Promise<Result<IRobotDTO>>;
  getRobot (nickname: string): Promise<Result<IRobotDTO>>;
  getAll() : Promise<Result<IRobotDTO[]>>;
}

