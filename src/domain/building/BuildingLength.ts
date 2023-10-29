import { ValueObject } from '../../core/domain/ValueObject';
import { Guard } from '../../core/logic/Guard';
import { Result } from '../../core/logic/Result';

interface BuildingLengthProps {
  value: number;
}

export class BuildingLength extends ValueObject<BuildingLengthProps> {
  get value(): number {
    return this.props.value;
  }

  private constructor(props: BuildingLengthProps) {
    super(props);
  }

  public static create(value: number): Result<BuildingLength> {
    const guardResult = Guard.againstNullOrUndefined(value, 'value');
    if (!guardResult.succeeded) {
      return Result.fail<BuildingLength>(guardResult.message);
    }

    if (BuildingLength.isValid(value)) {
      return Result.fail<BuildingLength>(
        'Building length must be a positive integer.',
      );
    } else {
      return Result.ok<BuildingLength>(new BuildingLength({ value: value }));
    }
  }

  private static isValid(value: number): boolean {
    return Number.isInteger(value) && value > 0;
  }
}
