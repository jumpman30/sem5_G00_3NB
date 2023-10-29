import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';
import { Guard } from '../../core/logic/Guard';

interface BuildingCodeProps {
  value: string;
}

export class BuildingCode extends ValueObject<BuildingCodeProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: BuildingCodeProps) {
    super(props);
  }

  public static create(code: string): Result<BuildingCode> {
    const guardResult = Guard.againstNullOrUndefined(code, 'code');
    if (!guardResult.succeeded ) {
      return Result.fail<BuildingCode>(guardResult.message);
    }

    if (BuildingCode.isValidBuildingCode(code)) {
      return Result.fail<BuildingCode>(
        'Building code is mandatory and has a maximum of 5 chars (leters, numbers and space).',
      );
    } else {
      return Result.ok<BuildingCode>(new BuildingCode({ value: code }));
    }
  }

  private static isValidBuildingCode(code: string): boolean {
    if (code.length > 5) {
      return false;
    }

    const regex = /^[A-Za-z0-9 ]+$/;
    return regex.test(code);
  }
}
