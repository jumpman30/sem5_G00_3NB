import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface RobotNumeroSerieProps {
  value: number;
}
export class RobotNumeroSerie extends ValueObject<RobotNumeroSerieProps>{
  get value(): number {
    return this.props.value;
  }
  private constructor(props: RobotNumeroSerieProps) {
    super(props);
  }
  public static create(robotNumeroSerie: number): Result<RobotNumeroSerie> {
    let guardResult = Guard.againstNullOrUndefined(robotNumeroSerie, '');
    if (guardResult.succeeded) {

      return Result.ok<RobotNumeroSerie>(new RobotNumeroSerie({ value: robotNumeroSerie}))
    }else{
      return Result.fail<RobotNumeroSerie>(guardResult.message);
    }
  }
  toString() {
    return String(this.props.value)
  }
}
