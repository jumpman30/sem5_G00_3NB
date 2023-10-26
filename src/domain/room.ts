import { AggregateRoot } from '../core/domain/AggregateRoot';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { Result } from '../core/logic/Result';
import { Guard } from '../core/logic/Guard';
import { Location } from './location';
import { RoomId } from './roomId';

interface RoomProps {
  buildingId: string;
  designation: string;
  doorLocation: Location;
  floorId: string;
  location: Location;
}

export class Room extends AggregateRoot<RoomProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get roomId(): RoomId {
    return RoomId.caller(this.id);
  }

  get buildingId(): string {
    return this.props.buildingId;
  }

  get floorId(): string {
    return this.props.floorId;
  }

  get location(): Location {
    return this.props.location;
  }

  get doorLocation(): Location {
    return this.props.doorLocation;
  }

  get designation(): string {
    return this.props.designation;
  }

  private constructor(props: RoomProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: RoomProps, id?: UniqueEntityID): Result<Room> {
    const guardedProps = [
      { argument: props.buildingId, argumentName: 'buildingId' },
      { argument: props.designation, argumentName: 'designation' },
      { argument: props.doorLocation, argumentName: 'doorLocation' },
      { argument: props.floorId, argumentName: 'floorId' },
      { argument: props.location, argumentName: 'location' },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Room>(guardResult.message);
    } else {
      const room = new Room(
        {
          ...props,
        },
        id,
      );

      return Result.ok<Room>(room);
    }
  }
}
