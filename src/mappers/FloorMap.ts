import { Mapper } from '../core/infra/Mapper';
import { Room } from '../domain/room';
import { Floor } from '../domain/floor';

export class FloorMap extends Mapper<Floor> {
  public static toPersistence(floor: Floor): any {
    return {
      domainId: floor.id.toString(),
      buildingId: floor.buildingId,
      number: floor.number,
    };
  }
}
