import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface RobotdesignationProps {
  value: string;
}
export class Robotdesignation extends ValueObject<RobotdesignationProps>{
  get value(): string {
    return this.props.value;
  }
  private constructor(props: RobotdesignationProps) {
    super(props);
  }
  public static create(robotdesignation: string): Result<Robotdesignation> {
    let guardResult = Guard.againstNullOrUndefined(robotdesignation, '');
    if (guardResult.succeeded) {

      return Result.ok<Robotdesignation>(new Robotdesignation({ value: robotdesignation}))
    }else{
      return Result.fail<Robotdesignation>(guardResult.message);
    }
  }
  toString() {
    return String(this.props.value)
  }
}
