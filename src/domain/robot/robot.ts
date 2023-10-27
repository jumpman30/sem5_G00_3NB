import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";
import { IRobotDTO } from "../../dto/IRobotDTO";
import { RobotNickname } from "./robotNickname";
import { Robotdesignation } from "./robotDesignation";
import { RobotState } from "./robotState";
import {RobotSerialNumber} from "./robotSerialNumber";
import { RobotType } from "../RobotType";

interface RobotProps {
  nickname: RobotNickname;
  designation: Robotdesignation;
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
    this.props.designation = Robotdesignation.create(value).getValue();
  }

  get state (): boolean {
    return this.props.state.value;
  }
  set state ( value: boolean) {
    this.props.state = RobotState.create(value).getValue();
  }

  get serialNumber (): number {
    return this.props.serialNumber.value;
  }
  set serialNumber ( value: number) {
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
    const designation = Robotdesignation.create(robotDTO.designation);
    const state = RobotState.create(robotDTO.state);
    const serialNumber = RobotSerialNumber.create(robotDTO.serialNumber);
    const robotType = RobotType.create(robotDTO.robotType, robotDTO.robotType.id);

    console.log(robotType)

    if(!robotType.isSuccess){
      return Result.fail(robotType.getValue())
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

}
