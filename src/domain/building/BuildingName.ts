import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";

interface BuildingNameProps {
  name: string;
}

export class BuildingName extends ValueObject<BuildingNameProps> {
  get value(): string {
    return this.props.name;
  }
  private constructor(props: BuildingNameProps) {
    super(props);
  }
  public static create(name: string): Result<BuildingName> {
    const guardResult = Guard.againstNullOrUndefined(name, 'name');
    if (!guardResult.succeeded ) {
      return Result.fail<BuildingName>(guardResult.message);
    }

    if (!BuildingName.isValid(name)) {
      return Result.fail<BuildingName>("Building name has maximum of 255 chars.");
    } else {
      return Result.ok<BuildingName>(new BuildingName({ name: name }));
    }
  }
  private static isValid(name: string): boolean {
    return name.length <= 255;
  }
}
