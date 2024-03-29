import { AggregateRoot } from '../../core/domain/AggregateRoot';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import { Result } from '../../core/logic/Result';
import { Guard } from '../../core/logic/Guard';
import { FloorId } from './floorId';
import { FloorMap } from './floorMap';

interface FloorProps {
  buildingId: string;
  number: string;
  floorMap?: FloorMap;
}

export class Floor extends AggregateRoot<FloorProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get floorId(): FloorId {
    return FloorId.caller(this.id);
  }
  get buildingId(): string {
    return this.props.buildingId;
  }

  get number(): string {
    return this.props.number;
  }

  get floorMap(): FloorMap {
    return this.props.floorMap;
  }

  set floorMap(floorMap: FloorMap) {
    this.props.floorMap = floorMap;
  }

  private constructor(props: FloorProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: FloorProps, id?: UniqueEntityID): Result<Floor> {
    const guardedProps = [
      { argument: props.number, argumentName: 'number' },
      { argument: props.buildingId, argumentName: 'buildingId' },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Floor>(guardResult.message);
    } else {
      const floor = new Floor(
        props,
        id,
      );

      return Result.ok<Floor>(floor);
    }
  }
}
