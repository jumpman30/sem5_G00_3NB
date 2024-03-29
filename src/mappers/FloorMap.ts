import { Mapper } from '../core/infra/Mapper';
import { Room } from '../domain/room/room';
import { Floor } from '../domain/floor/floor';
import { Document, Model } from "mongoose";
import { IFloorPersistence } from '../dataschema/IFloorPersistence';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { IFloorDto } from '../dto/IFloorDto';

export class FloorMap extends Mapper<Floor> {
  public static toPersistence(floor: Floor): any {
    return {
      domainId: floor.id.toString(),
      buildingId: floor.buildingId,
      floorMap: floor.floorMap,
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
      floorMap: floor.floorMap,
      number: floor.number
    } as IFloorDto;
  }

  public static toDto( passage: Floor): IFloorDto {
    if(!passage) return null
    return {
      domainId: passage.id.toString(),
      buildingId: passage.buildingId,
      floorMap: passage.floorMap,
      number: passage.number,
    } as IFloorDto;
  }
}
