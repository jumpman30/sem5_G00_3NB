import { Mapper } from "../core/infra/Mapper";
import { IRobotDTO } from "../dto/IRobotDTO";
import { Robot } from "../domain/robot/robot";
import { Document, Model } from "mongoose";
import {IRobotPersistence} from "../dataschema/IRobotPersistence";
import {UniqueEntityID} from "../core/domain/UniqueEntityID";
import { RobotTypeMap } from "./RobotTypeMap";
import { ICreateRobotResponseDto } from "../dto/ICreateRobotResponseDto";

export class RobotMap extends Mapper<Robot> {
  public static toDTO( robot: Robot): IRobotDTO {
    return {
      domainId: robot.id.toString(),
      state: robot.state,
      nickname: robot.nickname,
      designation: robot.designation,
      serialNumber: robot.serialNumber,
      robotType: robot.robotType
    } as IRobotDTO;
  }

  public static toResponseDTO( robot: Robot): ICreateRobotResponseDto {
    return {
      ...RobotMap.toDTO(robot),
      robotType: RobotTypeMap.toDTO(robot.robotType)
    } as ICreateRobotResponseDto;
  }

  public static toDomain (raw: any | Model<IRobotPersistence & Document>): Robot {

    const robotOrError = Robot.create(raw, new UniqueEntityID(raw.domainId));

    robotOrError.isFailure ? console.log(robotOrError.error) : '';

    return robotOrError.isSuccess ? robotOrError.getValue() : null;
  }

  public static toPersistence (robot: Robot): any {
    const robotPojso = {
      domainId: robot.id.toString(),
      state: robot.state,
      nickname: robot.nickname,
      designation: robot.designation,
      serialNumber: robot.serialNumber,
      robotType: robot.robotType.id.toValue()
    }
    return robotPojso;
  }
}
