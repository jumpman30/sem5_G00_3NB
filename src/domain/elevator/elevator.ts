import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";
import { IElevatorDto } from "../../dto/IElevatorDto";
import { IRobotDTO } from "../../dto/IRobotDTO";
import { RobotType } from "../robotType/RobotType";
import { ElevatorModel, ElevatorModelProps } from "./elevatorModel";
import { ElevatorSerialNumber } from "./elevatorSerialNumber";

export interface ElevatorProps {
  buildingId: string;
  elevatorId: string;
  availableFloorNumbers: string [];
  serialNumber: ElevatorSerialNumber;
  description: string;
  model: ElevatorModel;
}

export class Elevator extends AggregateRoot<ElevatorProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get serialNumber (): string {
    return this.props.serialNumber.value;
  }

  get buildingId() {
    return this.props.buildingId;
  }

  get elevatorId() {
    return this.props.elevatorId;
  }

  get availableFloorNumbers() {
    return this.props.availableFloorNumbers;
  }

  get description() {
    return this.props.description;
  }

  get model() {
    return this.props.model;
  }

  private constructor (props: ElevatorProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (elevatorDto: IElevatorDto, id?: UniqueEntityID): Result<Elevator> {
    const serialNumberCreated = ElevatorSerialNumber.create(elevatorDto.serialNumber);
    const modelCreated = ElevatorModel.create({model: elevatorDto.model, brand: elevatorDto.brand} as ElevatorModelProps);

    let mergedElements = this.anyFails([ serialNumberCreated, modelCreated]);

    if(!mergedElements.isSuccess){
      return Result.fail(mergedElements.errorValue())
    }

    const elevator = new Elevator({buildingId: elevatorDto.buildingId, elevatorId: elevatorDto.elevatorId, availableFloorNumbers: elevatorDto.availableFloorNumbers, description: elevatorDto.description, model: modelCreated.getValue(), serialNumber: serialNumberCreated.getValue()}, id);
    console.log("create")
    console.log(elevator)
    return Result.ok<Elevator>(elevator);
  }

  private static anyFails(args : Result<any>[]) : Result<any>{
    for (let arg of args) {
      if (!arg.isSuccess) return arg;
   }
    return Result.ok();
  }

}
