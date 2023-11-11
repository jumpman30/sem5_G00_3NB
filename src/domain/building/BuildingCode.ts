import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";

/*
 * Building Code is the Building ID
 */
export class BuildingCode extends UniqueEntityID {

  private constructor(code: string) {
    super(code);
  }

  public static create(code: string): Result<BuildingCode> {
    const guardResult = Guard.againstNullOrUndefined(code, 'code');
    if (!guardResult.succeeded ) {
      return Result.fail<BuildingCode>(guardResult.message);
    }
    if (!BuildingCode.isValid(code)) {
      return Result.fail<BuildingCode>("Building code is mandatory and has a maximum of 5 chars (letters, numbers and space).")
    } else {
      return Result.ok<BuildingCode>(new BuildingCode(code));
    }
  }
  public static isValid(code: string): boolean {
    if (code.length < 6 && code.length > 0) {
      let regex = /^[A-Za-z0-9 ]+$/;
      return regex.test(code)
    }
    return false;
  }
}
