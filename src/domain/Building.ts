import { Entity } from '../core/domain/Entity';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';

import { Result } from '../core/logic/Result';
import { BuildingId } from './BuildingId';
import { BuildingCode } from './BuildingCode';

import { Guard } from '../core/logic/Guard';

export interface BuildingProps {
  code: BuildingCode;
  name: string;
  length: number;
  width: number;
}

export class Building extends Entity<BuildingProps> {
  private constructor(props: BuildingProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get buildingId(): BuildingId {
    return new BuildingId(this._id.toValue());
  }

  get code(): BuildingCode {
    return this.props.code;
  }

  set code(value: BuildingCode) {
    this.props.code = value;
  }

  get name(): string {
    return this.props.name;
  }

  set name(value: string) {
    this.props.name = value;
  }

  get length(): number {
    return this.props.length;
  }

  set length(value: number) {
    this.props.length = value;
  }

  get width(): number {
    return this.props.width;
  }

  set width(value: number) {
    this.props.width = value;
  }

  public static create(
    props: BuildingProps,
    id?: UniqueEntityID,
  ): Result<Building> {
    const { code, length, width } = props;
    const guardedProps = [
      { argument: code, argumentName: 'code' },
      { argument: length, argumentName: 'length' },
      { argument: width, argumentName: 'width' },
    ];

    const guardNullResult = Guard.againstNullOrUndefinedOrEmptyBulk(
      guardedProps,
    );

    if (!guardNullResult.succeeded) {
      return Result.fail<Building>(guardNullResult.message);
    }

    if (Building.isValidSize(length)) {
      return Result.fail<Building>(
        'Building length must be a Integer and greater than 0.',
      );
    }

    if (Building.isValidSize(width)) {
      return Result.fail<Building>(
        'Building width must be a Integer and greater than 0.',
      );
    }

    const buildingModel = new Building(props, id);
    return Result.ok<Building>(buildingModel);
  }

  private static isValidSize(num: number): boolean {
    if (!num) {
      return false;
    }
    return num > 0 && Number.isInteger(num);
  }
}
