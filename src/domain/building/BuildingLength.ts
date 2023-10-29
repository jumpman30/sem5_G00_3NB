import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";

interface BuildingLengthProps {
  length: number;
}
export class BuildingLength extends ValueObject<BuildingLengthProps> {
  get value(): number {
    return this.props.length;
  }
  private constructor(props: { length: number}) {
    super(props);
  }

  public static create(length: number): Result<BuildingLength> {
    const guardResult = Guard.againstNullOrUndefined(length, 'length');
    if (!guardResult.succeeded ) {
      return Result.fail<BuildingLength>(guardResult.message);
    }
    if (!BuildingLength.isValid(length)) {
      return Result.fail<BuildingLength>(
        'Building length must be a Integer and greater than 0.',
      );
    }
    return Result.ok<BuildingLength>(new BuildingLength({length: length}));

  }
  private static isValid(num: number): boolean {
    if (!num) {
      return false;
    }
    return num > 0 && Number.isInteger(num);
  }
}
