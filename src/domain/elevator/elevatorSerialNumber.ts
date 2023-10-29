import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";
import { TextUtil } from "../../utils/TextUtil";

interface ElevatorSerialNumberProps {
  value: string;
}
export class ElevatorSerialNumber extends ValueObject<ElevatorSerialNumberProps>{
  get value(): string {
    return this.props.value;
  }
  private constructor(props: ElevatorSerialNumberProps) {
    super(props);
  }
  public static create(elevatorSerialNumber: string): Result<ElevatorSerialNumber> {
    let guardResult = Guard.againstNullOrUndefined(elevatorSerialNumber, 'ElevatorSerialNumber');
    if (!guardResult.succeeded) {
      return Result.fail<ElevatorSerialNumber>(guardResult.message);
    }

    if(!TextUtil.isAlphanumericNoSpaces(elevatorSerialNumber) || elevatorSerialNumber.length > 50)
    {
      return Result.fail<ElevatorSerialNumber>("Elevator serial number needs to be alphanumeric with no spaces and at maximum 50 characteres long");
    }

    return Result.ok<ElevatorSerialNumber>(new ElevatorSerialNumber({ value: elevatorSerialNumber}))
  }
  toString() {
    return String(this.props.value)
  }
}
