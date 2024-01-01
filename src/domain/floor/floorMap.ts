import { AggregateRoot } from '../../core/domain/AggregateRoot';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import { Result } from '../../core/logic/Result';
import { Guard } from '../../core/logic/Guard';
import { FloorId } from './floorId';
import { Entity } from '../../core/domain/Entity';

interface FloorMapProps {
  buildingId: string;
  floorId: string;
  size: object;
  rooms: [object]
  passages: [object]
  elevators: [object]
  mapMatrix: [string]
}

export class FloorMap extends Entity<FloorMapProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get floorMapId(): FloorId {
    return FloorId.caller(this.id);
  }
  get floorId(): string {
    return this.props.floorId;
  }

  get buildingId(): string {
    return this.props.buildingId;
  }

  get size(): object {
    return this.props.size;
  }

  get rooms(): [object] {
    return this.props.rooms;
  }

  get passages(): [object] {
    return this.props.passages;
  }

  get elevators(): [object] {
    return this.props.elevators;
  }

  get mapMatrix(): [string] {
    return this.props.mapMatrix;
  }

  public static create(props: FloorMapProps, id?: UniqueEntityID): Result<FloorMap> {
    const guardedProps = [
      { argument: props.floorId, argumentName: 'floorId' },
      { argument: props.size, argumentName: 'size' },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<FloorMap>(guardResult.message);
    } else {
      const floor = new FloorMap(
        props,
        id,
      );
        console.log(floor)
      return Result.ok<FloorMap>(floor);
    }
  }
}
