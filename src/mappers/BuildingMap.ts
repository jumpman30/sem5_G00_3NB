import { Mapper } from '../core/infra/Mapper';
import { Document, Model } from 'mongoose';

import { IBuildingDTO } from '../dto/IBuildingDTO';

import { Building } from '../domain/Building';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { BuildingCode } from '../domain/BuildingCode';

import { ICreateBuildingResponseDto } from '../dto/ICreateBuildingResponseDto';
import { IBuildingPersistence } from '../dataschema/IBuildingPersistence';

export class BuildingMap extends Mapper<Building> {
  public static toDTO(building: Building): IBuildingDTO {
    return {
      domainId: building.id.toString(),
      code: building.code,
      name: building.name,
      length: building.length,
      width: building.width,
    };
  }

  public static toResponseDTO(building: Building): ICreateBuildingResponseDto {
    const dto: ICreateBuildingResponseDto = BuildingMap.toDTO(building);
    return dto;
  }

  public static toDomain(
    raw: any | Model<IBuildingPersistence & Document>,
  ): Building {
    const buildingCodeOrError = BuildingCode.create(raw.code);
    const buildingOrError = Building.create(
      {
        code: buildingCodeOrError.getValue(),
        name: raw.name,
        length: raw.length,
        width: raw.width,
      },
      new UniqueEntityID(raw.domainId),
    );

    buildingOrError.isFailure ? console.log(buildingOrError.error) : '';

    return buildingOrError.isSuccess ? buildingOrError.getValue() : null;
  }

  public static toPersistence(building: Building): any {
    const buildingPojso = {
      domainId: building.id.toString(),
      code: building.code.value,
      name: building.name,
      length: building.length,
      width: building.width,
    };
    return buildingPojso;
  }
}
