import { Mapper } from '../core/infra/Mapper';
import { Room } from '../domain/room';
import { Floor } from '../domain/floor';
import { Building } from '../domain/building';
import { IBuildingDto } from '../dto/IBuildingDto';

export class BuildingMap extends Mapper<Building> {
  public static toPersistence(building: Building): any {
    return {
      domainId: building.id.toString(),
      designation: building.designation,
      width: building.width,
      length: building.length,
    };
  }

  public static toDTO( building: Building): IBuildingDto {
    return {
      domainId: building.id.toString(),
      designation: building.designation,
      length: building.length,
      width: building.width
    } as IBuildingDto;
  }

}
