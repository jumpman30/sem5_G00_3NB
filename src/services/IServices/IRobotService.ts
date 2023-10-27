import { Result } from "../../core/logic/Result";
import { ICreateRobotRequestDto } from "../../dto/ICreateRobotRequestDto";
import { ICreateRobotResponseDto } from "../../dto/ICreateRobotResponseDto";
import { IRobotDTO } from "../../dto/IRobotDTO";
export default interface IRobotService {
  createRobot(robotDTO: ICreateRobotRequestDto): Promise<Result<ICreateRobotResponseDto>>;
  updateRobot(robotDTO: IRobotDTO): Promise<Result<IRobotDTO>>;
  inactivateRobot(nickname: string): Promise<Result<IRobotDTO>>;
  activateRobot(nickname: string): Promise<Result<IRobotDTO>>;
  getRobot (nickname: string): Promise<Result<IRobotDTO>>;
  getAll() : Promise<Result<IRobotDTO[]>>;
}

