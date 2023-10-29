import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import { Guard } from '../../core/logic/Guard';
import {AggregateRoot} from "../../core/domain/AggregateRoot";

import { Result } from '../../core/logic/Result';
import { BuildingId } from './BuildingId';
import { BuildingCode } from './BuildingCode';
import {BuildingName} from "./BuildingName";
import {BuildingWidth} from "./BuildingWidth";
import {BuildingLength} from "./BuildingLength";
import {IRobotDTO} from "../../dto/IRobotDTO";
import {RobotNickname} from "../robot/robotNickname";
import {RobotDesignation} from "../robot/robotDesignation";
import {RobotState} from "../robot/robotState";
import {RobotSerialNumber} from "../robot/robotSerialNumber";
import {RobotType} from "../RobotType";
import IBuildingDto from "../../dto/building/IBuildingDto";

export interface BuildingProps {
  code: BuildingCode;
  name: BuildingName;
  width: BuildingWidth;
  length: BuildingLength;
}
export class Building extends AggregateRoot<BuildingProps> {
  private constructor(props: BuildingProps, id?: UniqueEntityID) {
    super(props, id);
  }
  get id(): UniqueEntityID {
    return this._id;
  }
  get buildingId(): BuildingId {
    return new BuildingId(this._id.toValue());
  }
  get code(): string {
    return this.props.code.value;
  }
  set code(value: string) {
    this.props.code = BuildingCode.create(value).getValue();
  }
  get name(): string {
    return this.props.name.value;
  }
  set name(value: string) {
    this.props.name = BuildingName.create(value).getValue();
  }
  get length(): number {
    return this.props.length.value;
  }
  set length(length: number) {
    this.props.length = BuildingLength.create(length).getValue();
  }
  get width(): number {
    return this.props.width.value;
  }
  set width(width: number) {
    this.props.width = BuildingWidth.create(width).getValue();
  }

  public static create(buildingDto: IBuildingDto, id?: UniqueEntityID): Result<Building> {
    const code = BuildingCode.create(buildingDto.code);
    const name = BuildingName.create(buildingDto.name);
    const length = BuildingLength.create(buildingDto.length);
    const width = BuildingWidth.create(buildingDto.width);

    let mergedElements = this.anyFails([code, name, length, width]);

    if(!mergedElements.isSuccess){
    return Result.fail(mergedElements.errorValue())
    }
    const building = new Building({
      code: code.getValue(),
      name: name.getValue(),
      length: length.getValue(),
      width: width.getValue(),
    }, id);

    return Result.ok<Building>(building);
  }
  private static anyFails(args : Result<any>[]) : Result<any>{
      for (let arg of args) {
      if (!arg.isSuccess) return arg;
    }
    return Result.ok();
  }
}
