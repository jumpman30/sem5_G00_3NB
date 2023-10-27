import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";
import { TextUtil } from "../../utils/TextUtil";

interface RobotDesignationProps {
  value: string;
}
export class RobotDesignation extends ValueObject<RobotDesignationProps>{
  get value(): string {
    return this.props.value;
  }
  private constructor(props: RobotDesignationProps) {
    super(props);
  }
  public static create(robotdesignation: string): Result<RobotDesignation> {
    let guardResult = Guard.againstNullOrUndefined(robotdesignation, 'robotdesignation');
    if (!guardResult.succeeded) {
      return Result.fail<RobotDesignation>(guardResult.message);
    }
 
    if(!TextUtil.isAlphanumeric(robotdesignation) || robotdesignation.length > 250)
    {
      return Result.fail<RobotDesignation>("Robot designation needs to alphanumeric and at maximum 250 characteres long");
    }

    return Result.ok<RobotDesignation>(new RobotDesignation({ value: robotdesignation}))
  }
  toString() {
    return String(this.props.value)
  }
}
