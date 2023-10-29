import { Mapper } from '../core/infra/Mapper';
import { Building } from '../domain/building/Building';
import IBuildingDto from '../dto/buildingDto/IBuildingDto';
import { Document, Model } from 'mongoose';
import { IBuildingPersistence } from '../dataschema/IBuildingPersistence';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { BuildingId } from '../domain/building/BuildingId';
import { ICreateBuildingResponseDto } from '../dto/buildingDto/ICreateBuildingResponseDto';
import { ICreateBuildingRequestDto } from '../dto/buildingDto/ICreateBuildingRequestDto';

export class BuildingMap extends Mapper<Building> {
  public static toPersistence(building: Building): any {
    return {
      domainId: building.id.toString(),
      code: building.code,
      name: building.name,
      width: building.width,
      length: building.length,
    };
  }

  public static toDTO(building: Building): ICreateBuildingRequestDto {
    const buildingDto: ICreateBuildingRequestDto = {
      code: building.code,
      name: building.name,
      width: building.width,
      length: building.length,
    };
    return buildingDto;
  }

  public static toDomain(
    raw: any | Model<IBuildingPersistence & Document>,
  ): Building {
    const buildingOrError = Building.create(raw, new UniqueEntityID(raw.code));
    buildingOrError.isFailure ? console.log(buildingOrError.error) : '';
    return buildingOrError.isSuccess ? buildingOrError.getValue() : null;
  }
}
