import { ValueObject } from '../core/domain/ValueObject';
import { Result } from '../core/logic/Result';
import { Guard } from '../core/logic/Guard';

interface LocationProps {
  x: string;
  y: string;
}

export class Location extends ValueObject<LocationProps> {
  get value(): LocationProps {
    return this.props;
  }

  private constructor(props: LocationProps) {
    super(props);
  }

  public static create(x: string, y: string): Result<Location> {
    const guardedProps = [
      { argument: x, argumentName: 'x' },
      { argument: y, argumentName: 'y' },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
    if (!guardResult.succeeded) {
      return Result.fail<Location>(guardResult.message);
    } else {
      return Result.ok<Location>(new Location({ x, y }));
    }
  }
}
