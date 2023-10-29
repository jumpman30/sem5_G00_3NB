import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";

interface BuildingWidthProps {
  width: number
}
export class BuildingWidth extends ValueObject<BuildingWidthProps> {

  get value(): number {
    return this.props.width;
  }

  private constructor(props: { width: number }) {
    super(props);
  }

  public static create( width: number): Result<BuildingWidth> {
    const guardResult = Guard.againstNullOrUndefined(width, 'width');
    if (!guardResult.succeeded ) {
      return Result.fail<BuildingWidth>(guardResult.message);
    }
    if (!BuildingWidth.isValid(width)) {
      return Result.fail<BuildingWidth>(
        'Building width must be a Integer and greater than 0.',
      );
    }
    return Result.ok<BuildingWidth>(new BuildingWidth({ width: width}));
  }
  private static isValid(num: number): boolean {
    if (!num) {
      return false;
    }
    return num > 0 && Number.isInteger(num);
  }
}
