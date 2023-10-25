import {Entity} from "../core/domain/Entity";
import {UniqueEntityID} from "../core/domain/UniqueEntityID";

import {Result} from "../core/logic/Result";
import {RobotTypeId} from "./RobotTypeId";

import {Guard} from "../core/logic/Guard";

interface RobotTypeProps {
    brand: string;
    model: string;
    robotType: string;
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

    public static create(props: RobotTypeProps, id?: UniqueEntityID): Result<RobotType> {
        const { brand, model, robotType } = props;
        const guardedProps = [
            {argument: brand, argumentName: 'brand'},
            {argument: model, argumentName: 'model'},
            {argument: robotType, argumentName: 'robotType'},
        ];

        const guardNullResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardNullResult.succeeded) {
            return Result.fail<RobotType>(guardNullResult.message)
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

    private static isAlphanumeric(str) {
        return /^[A-Za-z0-9\s]*$/.test(str);
      }
}