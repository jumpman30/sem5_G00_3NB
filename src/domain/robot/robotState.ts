import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface RobotStateProps {
  active: boolean;
}

export class RobotState extends ValueObject<RobotStateProps>{

  get value(): boolean {
    return this.props.active;
  }

  private constructor(props: RobotStateProps) {
    super(props);
  }

  public static create(robotstate: boolean): Result<RobotState> {
    let guardResult = Guard.againstNullOrUndefined(robotstate, 'robotstate');

    if (guardResult.succeeded) {
      return Result.ok<RobotState>(new RobotState({ active: robotstate}))
    }else{
      return Result.fail<RobotState>(guardResult.message);
    }
  }
  toString() {
    return String(this.props.active)
  }
}
