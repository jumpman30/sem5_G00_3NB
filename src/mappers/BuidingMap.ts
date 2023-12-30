import { Mapper } from '../core/infra/Mapper';
import { Building } from '../domain/building/building';
import { IBuildingDto } from '../dto/IBuildingDto';
import { Document, Model } from 'mongoose';
import { IBuildingPersistence } from '../dataschema/IBuildingPersistence';

export class BuildingMap extends Mapper<Building> {
  public static toPersistence(building: Building): any {
    return {
      domainId: building.domainId,
      designation: building.designation,
      width: building.width,
      length: building.length,
    };
  }

  public static toDTO(building: Building): IBuildingDto {
    return {
      buildingId: building.domainId,
      designation: building.designation,
      length: building.length,
      width: building.width,
    } as IBuildingDto;
  }

  public static toDomain(
    raw: any | Model<IBuildingPersistence & Document>,
  ): Building {
    const buildingOrError = Building.create(raw);
    buildingOrError.isFailure ? console.log(buildingOrError.error) : '';
    return buildingOrError.isSuccess ? buildingOrError.getValue() : null;
  }
}
