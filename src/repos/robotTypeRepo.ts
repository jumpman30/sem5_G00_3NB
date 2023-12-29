import { Service, Inject } from 'typedi';

import IRobotTypeRepo from '../services/IRepos/IRobotTypeRepo';
import { RobotType } from '../domain/robotType/RobotType';
import { RobotTypeId } from '../domain/robotType/RobotTypeId';
import { RobotTypeMap } from '../mappers/RobotTypeMap';

import { Document, FilterQuery, Model } from 'mongoose';
import { IRobotTypePersistence } from '../dataschema/IRobotTypePersistence';

@Service()
export default class RobotTypeRepo implements IRobotTypeRepo {
  private models: any;

  constructor(
    @Inject('RobotTypeSchema')
    private RobotTypeSchema: Model<IRobotTypePersistence & Document>,
  ) {}


  public async getAll(): Promise<RobotType[]> {

    const robotRecord = await this.RobotTypeSchema.find().populate("robotType");
    return robotRecord.map(item => RobotTypeMap.toDomain(item));
  }


  private createBaseQuery(): any {
    return {
      where: {},
    };
  }

  public async exists(robotType: RobotType): Promise<boolean> {
    const query = { robotType: robotType.robotType };
    console.log(query)
    const RobotTypeDocument = await this.RobotTypeSchema.findOne(
      query as FilterQuery<IRobotTypePersistence & Document>,
    );
    console.log(RobotTypeDocument)
    return !!RobotTypeDocument === true;
  }

  public async save(robotType: RobotType): Promise<RobotType> {

    const query = { domainId: robotType.robotTypeId.toString() };
    const RobotTypeDocument = await this.RobotTypeSchema.findOne(query);
    try {
      if (RobotTypeDocument === null) {
        const rawRobotType: any = RobotTypeMap.toPersistence(robotType);
        const RobotTypeCreated = await this.RobotTypeSchema.create(rawRobotType);
        console.log(RobotTypeDocument)
        return RobotTypeMap.toDomain(RobotTypeCreated);
      } else {
        RobotTypeDocument.model = robotType.model;
        RobotTypeDocument.brand = robotType.brand;
        RobotTypeDocument.robotType = robotType.robotType;

        await RobotTypeDocument.save();

        return robotType;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId(RobotTypeId: RobotTypeId | string): Promise<RobotType> {
    const query = { domainId: RobotTypeId };
    const RobotTypeRecord = await this.RobotTypeSchema.findOne(
      query as FilterQuery<IRobotTypePersistence & Document>,
    );

    if (RobotTypeRecord != null) {
      return RobotTypeMap.toDomain(RobotTypeRecord);
    } else return null;
  }

  public async findByRobotType(robotType: string): Promise<RobotType> {
    const query = { robotType };
    const RobotTypeRecord = await this.RobotTypeSchema.findOne(
      query as FilterQuery<IRobotTypePersistence & Document>,
    );
      console.log(RobotTypeRecord)
    if (RobotTypeRecord != null) {
      return RobotTypeMap.toDomain(RobotTypeRecord);
    } else return null;
  }
}
