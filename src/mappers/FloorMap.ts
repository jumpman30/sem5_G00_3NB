import { Mapper } from '../core/infra/Mapper';
import { Room } from '../domain/room';
import { Floor } from '../domain/floor';
import { IFloorPersistence } from '../dataschema/IFloorPersistence';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { Document, Model } from "mongoose";
import { IFloorDto } from '../dto/IFloorDto';

export class FloorMap extends Mapper<Floor> {
  public static toPersistence(floor: Floor): any {
    return {
      domainId: floor.id.toString(),
      buildingId: floor.buildingId,
      number: floor.number,
    };
  }
  public static toDomain (raw: any | Model<IFloorPersistence & Document>): Floor {
    const floorOrError = Floor.create(raw, new UniqueEntityID(raw.domainId));
    floorOrError.isFailure ? console.log(floorOrError.error) : '';
    return floorOrError.isSuccess ? floorOrError.getValue() : null;
  }

  public static toDTO( floor: Floor): IFloorDto {
    return {
      domainId: floor.id.toString(),
      buildingId: floor.buildingId,
      number: floor.number,
    } as IFloorDto;
  }
}
