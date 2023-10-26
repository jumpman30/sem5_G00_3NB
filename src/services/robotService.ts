import { Service, Inject } from 'typedi';
import config from "../../config";
import { IRobotDTO } from '../dto/IRobotDTO';
import { Robot } from "../domain/Robot/Robot";
import IRobotRepo from '../services/IRepos/IRobotRepo';
import IRobotService from './IServices/IRobotService';
import { Result } from "../core/logic/Result";
import { RobotMap } from "../mappers/RobotMap";

@Service()
export default class RobotService implements IRobotService {
  constructor(
    @Inject(config.repos.robot.name) private RobotRepo : IRobotRepo
  ) {}

  public async getRobot( RobotNickname: string): Promise<Result<IRobotDTO>> {
    try {
      const Robot = await this.RobotRepo.findByNickname(RobotNickname);

      if (Robot === null) {
        return Result.fail<IRobotDTO>("Robot not found");
      }
      else {
        const RobotDTOResult = RobotMap.toDTO( Robot ) as IRobotDTO;
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

  public async createRobot(RobotDTO: IRobotDTO): Promise<Result<IRobotDTO>> {
    try {
      const RobotOrError = await Robot.create( RobotDTO );

      if (RobotOrError.isFailure) {
        return Result.fail<IRobotDTO>(RobotOrError.errorValue());
      }

      const RobotResult = RobotOrError.getValue();

      await this.RobotRepo.save(RobotResult);

      const RobotDTOResult = RobotMap.toDTO( RobotResult ) as IRobotDTO;
      return Result.ok<IRobotDTO>( RobotDTOResult )
    } catch (e) {
      throw e;
    }
  }

  public async updateRobot(RobotDTO: IRobotDTO): Promise<Result<IRobotDTO>> {
    try {
      const Robot = await this.RobotRepo.findByNickname(RobotDTO.nickname);

      if (Robot === null) {
        return Result.fail<IRobotDTO>("Robot not found");
      }
      else {
        Robot.nickname = RobotDTO.nickname;
        Robot.estado = RobotDTO.estado;
        Robot.numeroSerie = RobotDTO.numeroSerie;
        Robot.designacao = RobotDTO.designacao;
        await this.RobotRepo.save(Robot);

        const RobotDTOResult = RobotMap.toDTO( Robot ) as IRobotDTO;
        return Result.ok<IRobotDTO>( RobotDTOResult )
      }
    } catch (e) {
      throw e;
    }
  }

  public async inactivateRobot(nickname: string): Promise<Result<IRobotDTO>> {
    try {

      const Robot = await this.RobotRepo.findByNickname(nickname);

      if (Robot === null) {
        return Result.fail<IRobotDTO>("Robot not found");
      }else {
        Robot.estado = false;
        await this.RobotRepo.save(Robot);

        const RobotDTOResult = RobotMap.toDTO( Robot ) as IRobotDTO;
        return Result.ok<IRobotDTO>( RobotDTOResult )
      }
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
        Robot.estado = true;
        await this.RobotRepo.save(Robot);

        const RobotDTOResult = RobotMap.toDTO( Robot ) as IRobotDTO;
        return Result.ok<IRobotDTO>( RobotDTOResult )
      }
    } catch (e) {
      throw e;
    }
  }
}
