import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';
import { Guard } from '../../core/logic/Guard';

interface BuildingCodeProps {
  code: string;
}

export class BuildingCode extends ValueObject<BuildingCodeProps> {
  get value(): string {
    return this.props.code;
  }

  private constructor(props: BuildingCodeProps) {
    super(props);
  }

  public static create(code: string): Result<BuildingCode> {
    const guardResult = Guard.againstNullOrUndefined(code, 'code');
    if (!guardResult.succeeded ) {
      return Result.fail<BuildingCode>(guardResult.message);
    }
    if (!BuildingCode.isValid(code)) {
      return Result.fail<BuildingCode>("Building code is mandatory and has a maximum of 5 chars (leters, numbers and space).")
    } else {
      return Result.ok<BuildingCode>(new BuildingCode({ code: code }));
    }
  }

  private static isValid(code: string): boolean {
    if (code.length < 6 && code.length > 0) {
      let regex = /^[A-Za-z0-9 ]+$/;
      return regex.test(code)
    }
    return false;
  }
}
