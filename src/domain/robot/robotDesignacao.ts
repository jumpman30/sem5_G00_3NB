import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface RobotDesignacaoProps {
  value: string;
}
export class RobotDesignacao extends ValueObject<RobotDesignacaoProps>{
  get value(): string {
    return this.props.value;
  }
  private constructor(props: RobotDesignacaoProps) {
    super(props);
  }
  public static create(robotDesignacao: string): Result<RobotDesignacao> {
    let guardResult = Guard.againstNullOrUndefined(robotDesignacao, '');
    if (guardResult.succeeded) {

      return Result.ok<RobotDesignacao>(new RobotDesignacao({ value: robotDesignacao}))
    }else{
      return Result.fail<RobotDesignacao>(guardResult.message);
    }
  }
  toString() {
    return String(this.props.value)
  }
}
