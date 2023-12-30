import { AggregateRoot } from '../../core/domain/AggregateRoot';
import { Result } from '../../core/logic/Result';
import { Guard } from '../../core/logic/Guard';
import { BuildingId } from './buildingId';

interface BuildingProps {
  domainId: string;
  designation?: string;
  length: string;
  width: string;
}

export class Building extends AggregateRoot<BuildingProps> {
  get id(): BuildingId {
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

  get domainId(): string {
    return this.props.domainId;
  }

  private constructor(props: BuildingProps, id: BuildingId) {
    super(props, id);
  }

  public static create(props: BuildingProps): Result<Building> {
    const guardedProps = [
      { argument: props.width, argumentName: 'width' },
      { argument: props.length, argumentName: 'length' },
      { argument: props.domainId, argumentName: "domainId" }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Building>(guardResult.message);
    } else {
      const uniqueId = BuildingId.create(props.domainId);
      const building = new Building(props, uniqueId);

      return Result.ok<Building>(building);
    }
  }
}
