import { Inject, Service } from "typedi";
import IRobotRepo from "./IRepos/IRobotRepo";
import { Robot } from "../domain/robot/robot";
import { RobotNickname } from "../domain/robot/robotNickname";
import { RobotMap } from "../mappers/RobotMap";
import { Document, Model } from "mongoose";
import { IRobotPersistence } from "../dataschema/IRobotPersistence";

@Service()
export default class RobotRepo implements IRobotRepo {
  private models: any;

  constructor(
    @Inject('robotSchema') private robotSchema : Model<IRobotPersistence & Document>,
  ) {}

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async save (robot: Robot): Promise<Robot> {
    const query = { nickname: robot.nickname };

    const robotDocument = await this.robotSchema.findOne( query );

    try {
      if (robotDocument === null ) {
        const rawRobot: any = RobotMap.toPersistence(robot);

        const robotCreated = await this.robotSchema.create(rawRobot);

        return RobotMap.toDomain(robotCreated);
      } else {
        robotDocument.nickname = robot.nickname;
        robotDocument.state = robot.state;
        robotDocument.designation = robot.designation;
        robotDocument.serialNumber = robot.serialNumber;

        await robotDocument.save();

        return robot;
      }
    } catch (err) {
      throw err;
    }
  }

  public async getAll(): Promise<Robot[]> {

    const robotRecord = await this.robotSchema.find().populate("robotType");
    return robotRecord.map(item => RobotMap.toDomain(item));
  }

  public async findByNickname (nickname: RobotNickname | string): Promise<Robot> {

    const idX = nickname instanceof RobotNickname ? (<RobotNickname>nickname).value : nickname;

    const query = { nickname: idX };
    const robotRecord = (await this.robotSchema.findOne( query ).populate("robotType"));

    if(robotRecord != null) {
      return RobotMap.toDomain(robotRecord);
    }
    else{
      return null;
    }
  }

  exists(t: Robot): Promise<boolean> {
    return Promise.resolve(false);
  }

}
