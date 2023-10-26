import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface RobotNicknameProps {
  value: string;
}
export class RobotNickname extends ValueObject<RobotNicknameProps>{
  get value(): string {
    return this.props.value;
  }
  private constructor(props: RobotNicknameProps) {
    super(props);
  }
  public static create(robotNickname: string): Result<RobotNickname> {
    let guardResult = Guard.againstNullOrUndefined(robotNickname, '');
    if (guardResult.succeeded) {

      return Result.ok<RobotNickname>(new RobotNickname({ value: robotNickname}))
    }else{
      return Result.fail<RobotNickname>(guardResult.message);
    }
  }
  toString() {
    return String(this.props.value)
  }
}
