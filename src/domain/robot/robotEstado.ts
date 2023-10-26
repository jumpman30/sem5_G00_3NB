import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface RobotEstadoProps {
  active: boolean;
}

export class RobotEstado extends ValueObject<RobotEstadoProps>{

  get value(): boolean {
    return this.props.active;
  }

  private constructor(props: RobotEstadoProps) {
    super(props);
  }

  public static create(robotEstado: boolean): Result<RobotEstado> {
    let guardResult = Guard.againstNullOrUndefined(robotEstado, '');

    if (guardResult.succeeded) {
      return Result.ok<RobotEstado>(new RobotEstado({ active: robotEstado}))
    }else{
      return Result.fail<RobotEstado>(guardResult.message);
    }
  }
  toString() {
    return String(this.props.active)
  }
}
