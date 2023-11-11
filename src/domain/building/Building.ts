import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import {AggregateRoot} from "../../core/domain/AggregateRoot";

import { Result } from '../../core/logic/Result';
import { BuildingCode } from './BuildingCode';
import {BuildingName} from "./BuildingName";
import {BuildingWidth} from "./BuildingWidth";
import {BuildingLength} from "./BuildingLength";
import {IBuildingCreateRequestDto, IBuildingUpdateRequestDto} from "../../dto/IBuildingDto";


export interface BuildingProps {
  name: BuildingName;
  width: BuildingWidth;
  length: BuildingLength;
}

export class Building extends AggregateRoot<BuildingProps> {
  private constructor(props: BuildingProps, code?: BuildingCode) {
    super(props, code);
  }
  public static create(buildingDto: IBuildingCreateRequestDto): Result<Building> {
    const code = BuildingCode.create(buildingDto.code);
    const name = BuildingName.create(buildingDto.name);
    const length = BuildingLength.create(buildingDto.length);
    const width = BuildingWidth.create(buildingDto.width);

    let mergedElements = this.anyFails([code, name, length, width]);

    if(!mergedElements.isSuccess){
      return Result.fail(mergedElements.errorValue())
    }

    const building = new Building({
      name: name.getValue(),
      length: length.getValue(),
      width: width.getValue(),
    }, code.getValue());

    return Result.ok<Building>(building);
  }
  public static update(buildingDto: IBuildingUpdateRequestDto, code?: BuildingCode): Result<Building> {
    const name = BuildingName.create(buildingDto.name);
    const length = BuildingLength.create(buildingDto.length);
    const width = BuildingWidth.create(buildingDto.width);

    let mergedElements = this.anyFails([name, length, width]);

    if(!mergedElements.isSuccess){
      return Result.fail(mergedElements.errorValue())
    }
    const building = new Building({
      name: name.getValue(),
      length: length.getValue(),
      width: width.getValue(),
    }, code);
    return Result.ok<Building>(building);
  }
  private static anyFails(args : Result<any>[]) : Result<any>{
    for (let arg of args) {
      if (!arg.isSuccess) return arg;
    }
    return Result.ok();
  }
  // Building ID is the Building Code
  get id(): BuildingCode {
    return this._id;
  }
  get code(): BuildingCode {
    return this.id;
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


}
