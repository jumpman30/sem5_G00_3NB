import { Mapper } from '../core/infra/Mapper';

import { Document, Model } from 'mongoose';

import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { RobotType } from '../domain/RobotType';

import IRobotTypeDto from '../dto/IRobotTypeDTO';

import { IRobotTypePersistence } from '../dataschema/IRobotTypePersistence';

export class RobotTypeMap extends Mapper<RobotType> {
  public static toDTO(robotType: RobotType): IRobotTypeDto {
    return {
      id: robotType.robotTypeId.toString(),
      model: robotType.model,
      brand: robotType.brand,
      robotType: robotType.robotType,
      taskTypes: robotType.taskTypes
    } as IRobotTypeDto;
  }

  public static toDomain(robotType: any | Model<IRobotTypePersistence & Document>): RobotType {
    const roleOrError = RobotType.create(robotType, new UniqueEntityID(robotType.domainId));

    roleOrError.isFailure ? console.log(roleOrError.error) : '';

    return roleOrError.isSuccess ? roleOrError.getValue() : null;
  }

  public static toPersistence(robotType: RobotType): any {
    return {
      domainId: robotType.robotTypeId.toString(),
      model: robotType.model,
      brand: robotType.brand,
      robotType: robotType.robotType,
      taskTypes: robotType.taskTypes
    };
  }
}
