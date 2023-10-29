import { ValueObject } from "../../core/domain/ValueObject";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";

interface BuildingWidthProps {
  value: number;
}

export class BuildingWidth extends ValueObject<BuildingWidthProps> {
  get value(): number {
    return this.props.value;
  }

  private constructor(props: BuildingWidthProps) {
    super(props);
  }

  public static create(value: number): Result<BuildingWidth> {
    const guardResult = Guard.againstNullOrUndefined(value, 'value');
    if (!guardResult.succeeded) {
      return Result.fail<BuildingWidth>(guardResult.message);
    }

    if (BuildingWidth.isValid(value)) {
      return Result.fail<BuildingWidth>(
        'Building width must be a positive integer.',
      );
    } else {
      return Result.ok<BuildingWidth>(new BuildingWidth({ value: value }));
    }
  }

  private static isValid(value: number): boolean {
    return Number.isInteger(value) && value > 0;
  }
}
