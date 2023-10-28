import { AggregateRoot } from '../core/domain/AggregateRoot';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { Result } from '../core/logic/Result';
import { Guard } from '../core/logic/Guard';
import { BuildingId } from './buildingId';
import { Location } from './location';
import { PassageId } from './passageId';

interface PassageProps {
  building1Id: string;
  building2Id: string;
  floorId: string;
  //Represents the entrance/exit of the corridor
  //It should only be coordinates of type { x, m-1} being m the width of the building
  locationBuilding1: [Location];
  locationBuilding2: [Location];
}

export class Passage extends AggregateRoot<PassageProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get passageId(): PassageId {
    return PassageId.caller(this.id);
  }

  private constructor(props: PassageProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(
    props: PassageProps,
    id?: UniqueEntityID,
  ): Result<Passage> {
    const guardedProps = [
      { argument: props.building1Id, argumentName: 'building1Id' },
      { argument: props.building2Id, argumentName: 'building2Id' },
      { argument: props.floorId, argumentName: 'floorId' },
      { argument: props.locationBuilding1, argumentName: 'floorId' },
      { argument: props.locationBuilding1, argumentName: 'location' },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Passage>(guardResult.message);
    } else {
      const room = new Passage(
        {
          ...props,
        },
        id,
      );

      return Result.ok<Passage>(room);
    }
  }
}
