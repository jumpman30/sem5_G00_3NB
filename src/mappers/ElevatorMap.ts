/* eslint-disable @typescript-eslint/no-object-literal-type-assertion */
import { Mapper } from '../core/infra/Mapper';

import { Document, Model } from 'mongoose';

import IRoleDTO from '../dto/IRoleDTO';

import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { Elevator } from '../domain/elevator/elevator';
import { IElevatorPersistence } from '../dataschema/IElevatorPersistence';
import { IElevatorDto } from '../dto/IElevatorDto';

export class ElevatorMap extends Mapper<Elevator> {
  public static toDTO(elevator: Elevator): IElevatorDto {
    return {
      buildingId: elevator.buildingId,
      elevatorId: elevator.elevatorId,
      availableFloorNumbers: elevator.availableFloorNumbers,
      serialNumber: elevator.serialNumber,
      description: elevator.description,
      model: elevator.model.model,
      brand: elevator.model.brand,
    } as IElevatorDto;
  }

  public static toDomain(
    elevator: any | Model<IElevatorPersistence & Document>,
  ): Elevator {
    const elevatorOrError = Elevator.create(
      elevator,
      new UniqueEntityID(elevator.elevatorId),
    );

    elevatorOrError.isFailure ? console.log(elevatorOrError.error) : '';

    return elevatorOrError.isSuccess ? elevatorOrError.getValue() : null;
  }

  public static toPersistence(elevator: Elevator): any {
    return {
      buildingId: elevator.buildingId,
      elevatorId: elevator.elevatorId,
      availableFloorNumbers: elevator.availableFloorNumbers,
      serialNumber: elevator.serialNumber,
      description: elevator.description,
      model: elevator.model.model,
      brand: elevator.model.brand,
    };
  }
}
