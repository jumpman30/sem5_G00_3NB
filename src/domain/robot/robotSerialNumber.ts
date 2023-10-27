import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface RobotSerialNumberProps {
  value: number;
}
export class RobotSerialNumber extends ValueObject<RobotSerialNumberProps>{
  get value(): number {
    return this.props.value;
  }
  private constructor(props: RobotSerialNumberProps) {
    super(props);
  }
  public static create(robotserialNumber: number): Result<RobotSerialNumber> {
    let guardResult = Guard.againstNullOrUndefined(robotserialNumber, '');
    if (guardResult.succeeded) {

      return Result.ok<RobotSerialNumber>(new RobotSerialNumber({ value: robotserialNumber}))
    }else{
      return Result.fail<RobotSerialNumber>(guardResult.message);
    }
  }
  toString() {
    return String(this.props.value)
  }
}
