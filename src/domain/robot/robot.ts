import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";
import { IRobotDTO } from "../../dto/IRobotDTO";
import { RobotNickname } from "./robotNickname";
import { RobotDesignation } from "./robotDesignation";
import { RobotState } from "./robotState";
import {RobotSerialNumber} from "./robotSerialNumber";
import { RobotType } from "../robotType/RobotType";

export interface RobotProps {
  nickname: RobotNickname;
  designation: RobotDesignation;
  state: RobotState;
  serialNumber: RobotSerialNumber;
  robotType: RobotType;
}

export class Robot extends AggregateRoot<RobotProps> {
  get id (): UniqueEntityID {
    return this._id;
  }
  get nickname (): string {
    return this.props.nickname.value;
  }
  set nickname ( value: string) {
    this.props.nickname = RobotNickname.create(value).getValue();
  }

  get designation (): string {
    return this.props.designation.value;
  }
  set designation ( value: string) {
    this.props.designation = RobotDesignation.create(value).getValue();
  }

  get state (): boolean {
    return this.props.state.value;
  }
  set state ( value: boolean) {
    this.props.state = RobotState.create(value).getValue();
  }

  get serialNumber (): string {
    return this.props.serialNumber.value;
  }
  set serialNumber ( value: string) {
    this.props.serialNumber = RobotSerialNumber.create(value).getValue();
  }

  get robotType (): RobotType {
    return this.props.robotType;
  }

  private constructor (props: RobotProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (robotDTO: IRobotDTO, id?: UniqueEntityID): Result<Robot> {
    const nickname = RobotNickname.create(robotDTO.nickname);
    const designation = RobotDesignation.create(robotDTO.designation);
    const state = RobotState.create(robotDTO.state);
    const serialNumber = RobotSerialNumber.create(robotDTO.serialNumber);
    const robotType = RobotType.create(robotDTO.robotType, robotDTO.robotType.id);

    let mergedElements = this.anyFails([nickname, designation, state, serialNumber, robotType]);

    if(!mergedElements.isSuccess){
      return Result.fail(mergedElements.errorValue())
    }

    const robot = new Robot({
      nickname: nickname.getValue(),
      designation: designation.getValue(),
      state: state.getValue(),
      serialNumber: serialNumber.getValue(),
      robotType: robotType.getValue()
    }, id);

    return Result.ok<Robot>(robot);
  }

  private static anyFails(args : Result<any>[]) : Result<any>{
    for (let arg of args) {
      if (!arg.isSuccess) return arg;
   }
    return Result.ok();
  }

}
