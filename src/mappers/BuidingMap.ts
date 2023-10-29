import { Mapper } from '../core/infra/Mapper';
import { Room } from '../domain/room';
import { Floor } from '../domain/floor';
import { Building } from '../domain/building';
import { IBuildingDto } from '../dto/IBuildingDto';
import { Document, Model } from "mongoose";
import { IBuildingPersistence } from '../dataschema/IBuildingPersistence';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { BuildingId } from '../domain/buildingId';

export class BuildingMap extends Mapper<Building> {
  public static toPersistence(building: Building): any {
    return {
      domainId: building.domainId,
      designation: building.designation,
      width: building.width,
      length: building.length,
    };
  }

  public static toDTO( building: Building): IBuildingDto {
    return {
      buildingId: building.domainId,
      designation: building.designation,
      length: building.length,
      width: building.width
    } as IBuildingDto;
  }

  public static toDomain (raw: any | Model<IBuildingPersistence & Document>): Building {
    const buildingOrError = Building.create(raw, new UniqueEntityID(raw.domainId));
    buildingOrError.isFailure ? console.log(buildingOrError.error) : '';
    return buildingOrError.isSuccess ? buildingOrError.getValue() : null;
  }

}
