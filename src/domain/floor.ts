import { AggregateRoot } from '../core/domain/AggregateRoot';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { Result } from '../core/logic/Result';
import { Guard } from '../core/logic/Guard';
import { FloorId } from './floorId';
import { BuildingId } from './building/BuildingId';

interface FloorProps {
  buildingId: string;
  number: string;
  minimum: string;
  maximum: string;
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

  get minimum(): string {
    return this.props.minimum;
  }

  get maximum(): string {
    return this.props.maximum;
  }

  private constructor(props: FloorProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: FloorProps, id?: UniqueEntityID): Result<Floor> {
    const guardedProps = [
      { argument: props.minimum, argumentName: 'minimum' },
      { argument: props.maximum, argumentName: 'maximum' },
      { argument: props.number, argumentName: 'number' },
      { argument: props.buildingId, argumentName: 'buildingId' },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Floor>(guardResult.message);
    } else {
      const floor = new Floor(
        {
          ...props,
        },
        id,
      );

      return Result.ok<Floor>(floor);
    }
  }
}
