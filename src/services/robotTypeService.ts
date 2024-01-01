import { Inject, Service } from "typedi";
import config from "../../config";
import { Result } from "../core/logic/Result";
import IRobotTypeService from "./IServices/IRobotTypeService";
import IRobotTypeDto from "../dto/IRobotTypeDTO";
import IRobtTypeRepo from "../repos/IRepos/IRobotTypeRepo";
import { RobotType } from "../domain/robotType/RobotType";
import { RobotTypeMap } from "../mappers/RobotTypeMap";
import AlreadyExistsException from "../core/infra/AlreadyExistsException";

@Service()
export default class robotTypeService implements IRobotTypeService {
  constructor(
    @Inject(config.repos.robotType.name)
    private robotTypeRepo: IRobtTypeRepo)
     {}

    public async getAll(): Promise<Result<IRobotTypeDto[]>> {
    try{
      let Robot = await this.robotTypeRepo.getAll();

      if (Robot === null) {
        return Result.fail("Robot not found");
      }
      const RobotDTOResult = Robot.map(item => RobotTypeMap.toDTO( item ));

      return Result.ok<IRobotTypeDto[]>( RobotDTOResult );
    } catch (e) {
      throw e;
    }
  }
  public async createRobotType(robotTypeDTO: IRobotTypeDto): Promise<Result<IRobotTypeDto>> {
    try {
      const robotTypeOrError = RobotType.create(robotTypeDTO);

      if (robotTypeOrError.isFailure) {
        return Result.fail<IRobotTypeDto>(robotTypeOrError.errorValue());
      }

      const robotTypeResult = robotTypeOrError.getValue();

      if(await this.robotTypeRepo.exists(robotTypeResult)){
        throw new AlreadyExistsException("User already exists");
      }

      await this.robotTypeRepo.save(robotTypeResult);

      const roleDTOResult = RobotTypeMap.toDTO(robotTypeResult) as IRobotTypeDto;
      return Result.ok<IRobotTypeDto>(roleDTOResult);
    } catch (e) {
      throw e;
    }
  }
}
