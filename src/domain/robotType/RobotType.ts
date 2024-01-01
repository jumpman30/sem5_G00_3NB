import { Entity } from "../../core/domain/Entity";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";

import { Result } from "../../core/logic/Result";
import { RobotTypeId } from "./RobotTypeId";

import { Guard, IGuardResult } from "../../core/logic/Guard";
import { TaskType } from "../task/TaskType";
import { TextUtil } from "../../utils/TextUtil";

export interface RobotTypeProps {
    robotType: string;
    brand: string;
    model: string;
    taskTypes: string []
}

export class RobotType extends Entity<RobotTypeProps> {
    private constructor(props: RobotTypeProps, id?: UniqueEntityID) {
        super(props, id);
    }

    get id(): UniqueEntityID {
        return this._id;
    }

    get robotTypeId(): RobotTypeId {
        return new RobotTypeId(this._id.toValue());
    }

    get brand(): string {
        return this.props.brand;
    }

    set brand(value: string) {
        this.props.brand = value;
    }

    get model(): string {
        return this.props.model;
    }

    set model(value: string) {
        this.props.model = value;
    }

    get robotType(): string {
        return this.props.robotType;
    }

    set robotType(value: string) {
        this.props.robotType = value;
    }

    get taskTypes(): string [] {
        return this.props.taskTypes;
    }

    public static create(props: RobotTypeProps, id?: UniqueEntityID): Result<RobotType> {
        const { brand, model, robotType, taskTypes } = props;
        const guardedProps = [
            {argument: brand, argumentName: 'brand'},
            {argument: model, argumentName: 'model'},
            {argument: robotType, argumentName: 'robotType'},
        ];

        const guardNullResult = Guard.againstNullOrUndefinedOrEmptyBulk(guardedProps);

        if (!guardNullResult.succeeded) {
            return Result.fail<RobotType>(guardNullResult.message)
        }

        const taskTypesValidation = this.validateTaskTypes(taskTypes);
        if (!taskTypesValidation.succeeded) {
            return Result.fail<RobotType>(taskTypesValidation.message)
        }

        if(!TextUtil.isAlphanumeric(robotType) || robotType.length > 25){
            return Result.fail<RobotType>("Robot type should have at max 25 characteres.(alphanumeric only)")
        }

        if((brand.length > 50 || brand.length === 0) || (model.length > 100 || model.length===0)){
            return Result.fail<RobotType>("Robot brand and model should have at max 50 and 100 characteres respectively.")
        }

        const robotTypeModel = new RobotType(props, id);
        return Result.ok<RobotType>(robotTypeModel)
    }

    private static validateTaskTypes(taskTypes: string[]): IGuardResult {
        if(!taskTypes || taskTypes.length > 2 || taskTypes.length === 0){
            return {
                succeeded: false,
                message: `Robot type should have at least 1 and at most 2 task types`,
              };
        }
        for (const taskType of taskTypes) {
          if (!Object.values(TaskType).includes(taskType)) {
                return {
                    succeeded: false,
                    message: `Robot type ${taskType} is not recognized as a valid task type, please add a PickupAndDelivery and/or a Surveillance type.`,
                  };
            }
        }
        return {
            succeeded: true,
          };
    }
}
