import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";
import { TextUtil } from "../../utils/TextUtil";

export interface ElevatorModelProps {
  model: string;
  brand: string;
}
export class ElevatorModel extends ValueObject<ElevatorModelProps>{

  get model(): string {
    return this.props.model;
  }

  get brand(): string {
    return this.props.brand;
  }

  private constructor(props: ElevatorModelProps) {
    super(props);
  }
  public static create(elevatorModelProps: ElevatorModelProps): Result<ElevatorModel> {
    const { brand, model } = elevatorModelProps;
    const guardedProps = [
      {argument: brand, argumentName: 'ElevatorBrand'},
      {argument: model, argumentName: 'ElevatorModel'},
    ];

    const guardNullResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardNullResult.succeeded) {
      return Result.fail<ElevatorModel>(guardNullResult.message);
    }

    if(!TextUtil.isAlphanumeric(model) || model.length > 50)
    {
      return Result.fail<ElevatorModel>("Elevator model needs to alphanumeric and at maximum 50 characteres long");
    }

    if(!TextUtil.isAlphanumeric(brand) || brand.length > 50)
    {
      return Result.fail<ElevatorModel>("Elevator brand needs to alphanumeric and at maximum 50 characteres long");
    }


    return Result.ok<ElevatorModel>(new ElevatorModel(elevatorModelProps))
  }
  toString() {
    return `Brand: ${this.brand}, model: ${this.model}`
  }
}
