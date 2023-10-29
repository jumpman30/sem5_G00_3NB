import {Mapper} from '../core/infra/Mapper';
import {Document, Model} from 'mongoose';

import {Building} from '../domain/building/Building';
import {UniqueEntityID} from '../core/domain/UniqueEntityID';

import IBuildingDto from '../dto/building/IBuildingDto';
import {ICreateBuildingResponseDto} from '../dto/building/ICreateBuildingResponseDto';
import {IBuildingPersistence} from '../dataschema/IBuildingPersistence';

export class BuildingMap extends Mapper<Building> {
  public static toDTO(building: Building): IBuildingDto {
    return {
      domainId: building.id.toString(),
      code: building.code.toString(),
      name: building.name.toString(),
      length: building.length.valueOf(),
      width: building.width.valueOf()
    };
  }

  public static toResponseDTO(building: Building): ICreateBuildingResponseDto {
    return {
      ...BuildingMap.toDTO(building),
    } as ICreateBuildingResponseDto;
  }

  public static toDomain (raw: any | Model<IBuildingPersistence & Document>): Building {

    const buildingOrError = Building.create(raw, new UniqueEntityID(raw.domainId));
    buildingOrError.isFailure ? console.log(buildingOrError.error) : '';

    return buildingOrError.isSuccess ? buildingOrError.getValue() : null;
  }

  public static toPersistence(building: Building): any {
    return {
      domainId: building.id.toString(),
      code: building.code,
      name: building.name,
      length: building.length,
      width: building.width,
    };
  }
}
