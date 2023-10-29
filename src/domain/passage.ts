import { AggregateRoot } from '../core/domain/AggregateRoot';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { Result } from '../core/logic/Result';
import { Guard } from '../core/logic/Guard';
import { Location } from './location';
import { PassageId } from './passageId';

interface PassageProps {
  building1Id: string;
  building2Id: string;
  floor1Id: string;
  floor2Id: string;
  //Represents the entrance/exit of the passage
  //It should only be coordinates of type { x, m-1} being m the width of the building
  locationBuilding1: [{ x: string, y: string }];
  locationBuilding2: [{ x: string, y: string }];
}

export class Passage extends AggregateRoot<PassageProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get passageId(): PassageId {
    return PassageId.caller(this.id);
  }

  get building1Id(): string {
    return this.props.building1Id;
  }

  get building2Id(): string {
    return this.props.building2Id;
  }

  get floor1Id(): string {
    return this.props.floor1Id;
  }

  get floor2Id(): string {
    return this.props.floor2Id;
  }

  get locationBuilding1(): { x: string, y: string }[] {
    return this.props.locationBuilding1;
  }

  get locationBuilding2(): { x: string, y: string }[] {
    return Array.from(this.props.locationBuilding2.values());
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
      { argument: props.floor1Id, argumentName: 'floor1Id' },
      { argument: props.floor2Id, argumentName: 'floor2Id' },
      { argument: props.locationBuilding1, argumentName: 'locationBuilding1' },
      { argument: props.locationBuilding1, argumentName: 'locationBuilding1' },
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
