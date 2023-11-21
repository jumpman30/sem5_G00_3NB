import { Mapper } from '../core/infra/Mapper';
import { Document, Model } from "mongoose";
import { IFloorPersistence } from '../dataschema/IFloorPersistence';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { FloorMap } from '../domain/floorMap';

export class FloorMapMapping extends Mapper<FloorMap> {
  public static toPersistence(floorMap: FloorMap): any {
    return {
      floorId: floorMap.floorId,
      buildingId: floorMap.buildingId,
      size: floorMap.size,
      rooms: floorMap.rooms,
      passages: floorMap.passages,
      elevators: floorMap.elevators
    };
  }

  public static toDomain (raw: any | Model<IFloorPersistence & Document>): FloorMap {
    const floorOrError = FloorMap.create(raw, new UniqueEntityID(raw.floorId));
    floorOrError.isFailure ? console.log(floorOrError.error) : '';
    return floorOrError.isSuccess ? floorOrError.getValue() : null;
  }

}
