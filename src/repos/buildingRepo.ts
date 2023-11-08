import { Service, Inject } from 'typedi';
import { Document, Model,FilterQuery } from 'mongoose';
import IBuildingRepo from '../services/IRepos/IBuildingRepo';
import { Building } from '../domain/building';
import { BuildingId } from '../domain/buildingId';
import { IBuildingPersistence } from '../dataschema/IBuildingPersistence';
import { BuildingMap } from '../mappers/BuidingMap';

@Service()
export default class BuildingRepo implements IBuildingRepo {
  constructor(
    @Inject('buildingSchema')
    private buildingSchema: Model<IBuildingPersistence & Document>,
    @Inject('logger') private logger,
  ) {}

  public async save(building: Building): Promise<BuildingId> {
    const rawRoom: any = BuildingMap.toPersistence(building);

    try {
      const buildingDb = await this.buildingSchema.create(rawRoom);
      return new BuildingId(buildingDb.domainId);
    } catch (e) {
      throw e;
    }
  }

  public async findByDomainId(buildingId: Building | string): Promise<Building> {
    const query = { domainId: buildingId };
        const buildingRecord = await this.buildingSchema.findOne(
      query as FilterQuery<IBuildingPersistence & Document>,
    );
    if (buildingRecord != null) {
      return BuildingMap.toDomain(buildingId);
    } else return null;
  }

  public async getAllBuildings(): Promise<Building[]> {
    try {
      const buildingRecords = await this.buildingSchema.find({});
      return buildingRecords.map((record) => BuildingMap.toDomain(record));
    } catch (e) {
      throw e;
    }
  }

  public async exists(buildingId: string): Promise<boolean> {
    const query = { domainId: buildingId };
    const buildingDocument = await this.buildingSchema.findOne(
      query as FilterQuery<IBuildingPersistence & Document>,
    );
    
    return !!buildingDocument === true;
  }
}
