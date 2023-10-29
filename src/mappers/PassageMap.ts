import { Mapper } from '../core/infra/Mapper';
import { Room } from '../domain/room';
import { Floor } from '../domain/floor';
import { Passage } from '../domain/passage';

export class PassageMap extends Mapper<Passage> {
  public static toPersistence(passage: Passage): any {
    return {
      domainId: passage.id.toString(),
      building1Id: passage.building1Id,
      building2Id: passage.building2Id,
      floor1Id: passage.floor1Id,
      floor2Id: passage.floor2Id,
      locationBuilding1: passage.locationBuilding1,
      locationBuilding2: passage.locationBuilding2
    };
  }
}
