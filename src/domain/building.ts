import { AggregateRoot } from '../core/domain/AggregateRoot';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { Result } from '../core/logic/Result';
import { Guard } from '../core/logic/Guard';
import { BuildingId } from './buildingId';

interface BuildingProps {
  designation: string;
  length: string;
  width: string;
}

export class Building extends AggregateRoot<BuildingProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get designation(): string {
    return this.props.designation;
  }

  get width(): string {
    return this.props.width;
  }

  get length(): string {
    return this.props.length;
  }

  private constructor(props: BuildingProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(
    props: BuildingProps,
    id?: UniqueEntityID,
  ): Result<Building> {
    const guardedProps = [
      { argument: props.width, argumentName: 'width' },
      { argument: props.length, argumentName: 'length' },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Building>(guardResult.message);
    } else {
      const building = new Building(
        {
          ...props,
        },
        id,
      );

      return Result.ok<Building>(building);
    }
  }
}
