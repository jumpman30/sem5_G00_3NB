import { Service, Inject } from 'typedi';
import config from "../../config";
import { IRobotDTO } from '../dto/IRobotDTO';
import { Robot } from "../domain/robot/robot";
import IRobotRepo from './IRepos/IRobotRepo';
import IRobotService from './IServices/IRobotService';
import { Result } from "../core/logic/Result";
import { RobotMap } from "../mappers/RobotMap";
import IRobotTypeRepo from './IRepos/IRobotTypeRepo';
import { ICreateRobotRequestDto } from '../dto/ICreateRobotRequestDto';
import { ICreateRobotResponseDto } from '../dto/ICreateRobotResponseDto';

@Service()
export default class RobotService implements IRobotService {
  constructor(
    @Inject(config.repos.robot.name) private RobotRepo : IRobotRepo,
    @Inject(config.repos.robotType.name) private RobotTypeRepo : IRobotTypeRepo
  ) {}

  public async getRobot( RobotNickname: string): Promise<Result<IRobotDTO>> {
    try {
      const Robot = await this.RobotRepo.findByNickname(RobotNickname);

      if (Robot === null) {
        return Result.fail<IRobotDTO>("Robot not found");
      }
      else {
        const RobotDTOResult = RobotMap.toDTO(Robot) as IRobotDTO;
        return Result.ok<IRobotDTO>( RobotDTOResult )
      }
    } catch (e) {
      throw e;
    }
  }

  public async getAll(): Promise<Result<IRobotDTO[]>> {
    try{
      let Robot = await this.RobotRepo.getAll();

      if (Robot === null) {
        return Result.fail("Robot not found");
      }
      const RobotDTOResult = Robot.map(item => RobotMap.toDTO( item ));

      return Result.ok<IRobotDTO[]>( RobotDTOResult );
    } catch (e) {
      throw e;
    }
  }

  public async createRobot(createRobotDto: ICreateRobotRequestDto): Promise<Result<ICreateRobotResponseDto>> {
    try {
      let robotTypeOrNull = await this.RobotTypeRepo.findByRobotType(createRobotDto.robotType);

      if(!robotTypeOrNull){
        return Result.fail("Robot type not found.")
      }

      const robotDto = { ...createRobotDto, robotType: robotTypeOrNull} as IRobotDTO;

      const RobotOrError = Robot.create(robotDto);

      if (RobotOrError.isFailure) {
        return Result.fail<ICreateRobotResponseDto>(RobotOrError.errorValue());
      }

      const RobotResult = RobotOrError.getValue();

      await this.RobotRepo.save(RobotResult);

      const RobotDTOResult = RobotMap.toResponseDTO( RobotResult ) as ICreateRobotResponseDto;
      return Result.ok<ICreateRobotResponseDto>( RobotDTOResult )
    } catch (e) {
      throw e;
    }
  }

  public async updateRobot(RobotDTO: IRobotDTO): Promise<Result<IRobotDTO>> {
    try {
      const Robot = await this.RobotRepo.findByNickname(RobotDTO.nickname);

      if (!Robot) {
        return Result.fail<IRobotDTO>("Robot not found");
      }
      else {
        Robot.nickname = RobotDTO.nickname;
        Robot.state = RobotDTO.state;
        Robot.serialNumber = RobotDTO.serialNumber;
        Robot.designation = RobotDTO.designation;
        await this.RobotRepo.save(Robot);

        const RobotDTOResult = RobotMap.toDTO( Robot ) as IRobotDTO;
        return Result.ok<IRobotDTO>( RobotDTOResult )
      }
    } catch (e) {
      throw e;
    }
  }

  public async inhibtRobot(nickname: string): Promise<Result<IRobotDTO>> {
    try {
      const robot = await this.RobotRepo.findByNickname(nickname);

      if (!robot) {
        return Result.fail<IRobotDTO>("Robot not found.");
      }

      robot.state = false;
      await this.RobotRepo.save(robot);

      return Result.ok<IRobotDTO>()
    } catch (e) {
      throw e;
    }

  }

  public async activateRobot(nickname: string): Promise<Result<IRobotDTO>> {
    try {

      const Robot = await this.RobotRepo.findByNickname(nickname);

      if (Robot === null) {
        return Result.fail<IRobotDTO>("Robot not found");
      }else {
        Robot.state = true;
        await this.RobotRepo.save(Robot);

        const RobotDTOResult = RobotMap.toDTO( Robot ) as IRobotDTO;
        return Result.ok<IRobotDTO>( RobotDTOResult )
      }
    } catch (e) {
      throw e;
    }
  }
}
