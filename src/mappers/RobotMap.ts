import { Mapper } from "../core/infra/Mapper";
import { IRobotDTO } from "../dto/IRobotDTO";
import { Robot } from "../domain/robot/robot";
import { Document, Model } from "mongoose";
import {IRobotPersistence} from "../dataschema/IRobotPersistence";
import {UniqueEntityID} from "../core/domain/UniqueEntityID";

export class RobotMap extends Mapper<Robot> {
  public static toDTO( robot: Robot): IRobotDTO {
    return {
      domainId: robot.id.toString(),
      estado: robot.estado,
      nickname: robot.nickname,
      designacao: robot.designacao,
      numerSerie: robot.numeroSerie,
    } as IRobotDTO;
  }

  public static toDomain (raw: any | Model<IRobotPersistence & Document>): Robot {

    const robotOrError = Robot.create(raw, new UniqueEntityID(raw.domainId));

    robotOrError.isFailure ? console.log(robotOrError.error) : '';

    return robotOrError.isSuccess ? robotOrError.getValue() : null;
  }

  public static toPersistence (robot: Robot): any {
    const a = {
      domainId: robot.id.toString(),
      estado: robot.estado,
      nickname: robot.nickname,
      designacao: robot.designacao,
      numerSerie: robot.numeroSerie,
    }
    return a;
  }
}
