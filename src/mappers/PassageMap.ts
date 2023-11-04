import { Mapper } from '../core/infra/Mapper';
import { Room } from '../domain/room';
import { Floor } from '../domain/floor';
import { Passage } from '../domain/passage';
import { IPassagePersistence } from '../dataschema/IPassagePersistence';
import { Document, Model } from 'mongoose';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { IPassageDto } from '../dto/IPassageDto';
import { IFloorDto } from '../dto/IFloorDto';
import { IPassageFloorDto } from '../dto/IPassageFloorDto';

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

  public static toDomain (raw: any | Model<IPassagePersistence & Document>): Passage {
    const robotOrError = Passage.create(raw, new UniqueEntityID(raw.domainId));

    robotOrError.isFailure ? console.log(robotOrError.error) : '';

    return robotOrError.isSuccess ? robotOrError.getValue() : null;
  }

  public static toDTO( passage: Passage): IPassageDto {
    return {
      building1Id: passage.building1Id,
      building2Id: passage.building2Id,
      floor1Id: passage.floor1Id,
      floor2Id: passage.floor2Id,
      locationBuilding1: passage.locationBuilding1,
      locationBuilding2: passage.locationBuilding2
    } as IPassageDto;
  }

  static toFloorPassageRequestDTO(passage: Passage, floorsInfo: IFloorDto[]): IPassageFloorDto {
    if(!passage) return null;
    return {
      building1Id: passage.building1Id,
      building2Id: passage.building2Id,
      floor: floorsInfo.find(e => e.domainId===passage.floor1Id),
      locationBuilding1: passage.locationBuilding1,
      locationBuilding2: passage.locationBuilding2
    } as IPassageFloorDto;
  }
}
