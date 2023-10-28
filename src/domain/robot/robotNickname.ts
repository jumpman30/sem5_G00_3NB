import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";
import { TextUtil } from "../../utils/TextUtil";

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
    let guardResult = Guard.againstNullOrUndefined(robotNickname, 'nickname');
    if (!guardResult.succeeded) {
      return Result.fail<RobotNickname>(guardResult.message);
    }

    if (!TextUtil.isAlphanumeric(robotNickname) || robotNickname.length > 30) {
      return Result.fail<RobotNickname>("Robot nickname needs to alphanumeric and at maximum 30 characteres long");
    }

    return Result.ok<RobotNickname>(new RobotNickname({ value: robotNickname}))
  }
  toString() {
    return String(this.props.value)
  }
}
