import { Inject, Service } from 'typedi';
import { Document, FilterQuery, Model } from 'mongoose';
import IBuildingRepo from "./IRepos/IBuildingRepo";
import { Building } from '../domain/building/building';
import { BuildingId } from '../domain/building/buildingId';
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

  public async findByDomainId(buildingId: string): Promise<Building> {
    const query = { domainId: buildingId };
    const buildingRecord = await this.buildingSchema.findOne(
      query as FilterQuery<IBuildingPersistence & Document>,
    );
    if (buildingRecord != null) {
      return BuildingMap.toDomain(buildingRecord);
    } else return null;
  }

  public async getAllBuildings(): Promise<Building[]> {
    const buildingRecords = await this.buildingSchema.find();
    return buildingRecords.map(record => BuildingMap.toDomain(record));
  }

  public async exists(buildingId: string): Promise<boolean> {
    const query = { domainId: buildingId };
    const buildingDocument = await this.buildingSchema.findOne(
      query as FilterQuery<IBuildingPersistence & Document>,
    );

    return !!buildingDocument === true;
  }
  public async update(building: Building): Promise<Building> {
    try {
          const buildingId = building.domainId;

          const buildingDb = await this.buildingSchema.findByIdAndUpdate(
            { buildingId }, // Filter by buildingId
            BuildingMap.toPersistence(building), // Update with the new data
            { new: true }, // Return the updated document
          );

          if (buildingDb) {
            return BuildingMap.toDomain(buildingDb);
          } else {
            // Handle the case where the document with the specified buildingId was not found
            throw new Error(`Building with ID ${building.domainId} not found`);
          }

          // Convert the updated document back to your domain object
        } catch (e) {
      throw e;
    }
  }
}
