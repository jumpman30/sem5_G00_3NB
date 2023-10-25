import { Service, Inject } from 'typedi';

import IRobotTypeRepo from '../services/IRepos/IRobotTypeRepo';
import { RobotType } from '../domain/RobotType';
import { RobotTypeId } from '../domain/RobotTypeId';
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

  private createBaseQuery(): any {
    return {
      where: {},
    };
  }

  public async exists(robotType: RobotType): Promise<boolean> {
    const query = { brand: robotType.brand, model: robotType.model, robotType: robotType.robotType };
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
}
