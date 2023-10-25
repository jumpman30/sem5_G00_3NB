import {Entity} from "../core/domain/Entity";
import {UniqueEntityID} from "../core/domain/UniqueEntityID";

import {Result} from "../core/logic/Result";
import {RobotTypeId} from "./RobotTypeId";

import {Guard, IGuardResult} from "../core/logic/Guard";
import { TaskTypes } from "./TaskTypes";

interface RobotTypeProps {
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
        return super._id;
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
            {argument: taskTypes, argumentName: 'taskTypes'},
        ];

        const guardNullResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardNullResult.succeeded) {
            return Result.fail<RobotType>(guardNullResult.message)
        } 

        const taskTypesValidation = this.validateTaskTypes(taskTypes);
        console.log("here?")
        console.log(taskTypesValidation)
        if (!taskTypesValidation.succeeded) {
            return Result.fail<RobotType>(taskTypesValidation.message)
        } 

        if(!this.isAlphanumeric(robotType) || robotType.length > 25){
            return Result.fail<RobotType>("Robot type should have at max 25 characteres.(alphanumeric only)")
        }

        if(brand.length > 50 || model.length > 100){
            return Result.fail<RobotType>("Robot brand and model should have at max 50 and 100 characteres respectively.")
        }

        const truck = new RobotType(props, id);
        return Result.ok<RobotType>(truck)
    }

    private static isAlphanumeric(str: string): boolean {
        return /^[A-Za-z0-9\s]*$/.test(str);
    }

    private static validateTaskTypes(taskTypes: string[]): IGuardResult {
        if(taskTypes.length > 2 || taskTypes.length === 0){
            return {
                succeeded: false,
                message: `Robot type should have at least 1 and at most 2 task types`,
              };
        }
        for (const taskType of taskTypes) {
            if (!Object.values(TaskTypes).includes(taskType)) {
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