import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";
import { TextUtil } from "../../utils/TextUtil";

interface RobotSerialNumberProps {
  value: string;
}
export class RobotSerialNumber extends ValueObject<RobotSerialNumberProps>{
  get value(): string {
    return this.props.value;
  }
  private constructor(props: RobotSerialNumberProps) {
    super(props);
  }
  public static create(robotserialNumber: string): Result<RobotSerialNumber> {
    let guardResult = Guard.againstNullOrUndefined(robotserialNumber, 'robotserialNumber');
    if (!guardResult.succeeded) {
      return Result.fail<RobotSerialNumber>(guardResult.message);
    }

    if(!TextUtil.isAlphanumeric(robotserialNumber) || robotserialNumber.length > 250)
    {
      return Result.fail<RobotSerialNumber>("Robot serial number needs to alphanumeric and at maximum 50 characteres long");
    }

    return Result.ok<RobotSerialNumber>(new RobotSerialNumber({ value: robotserialNumber}))
  }
  toString() {
    return String(this.props.value)
  }
}
