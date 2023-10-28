import { Service, Inject } from 'typedi';
import { Document, FilterQuery, Model } from 'mongoose';

import { IBuildingPersistence } from '../dataschema/IBuildingPersistence';

import { Building } from '../domain/Building';
import { BuildingMap } from '../mappers/BuildingMap';

import IBuildingRepo from '../services/IRepos/IBuildingRepo';

@Service()
export default class BuildingRepo implements IBuildingRepo {
  private models: any;

  constructor(
    @Inject('buildingSchema')
    private buildingSchema: Model<IBuildingPersistence & Document>,
  ) {}

  private createBaseQuery(): any {
    return {
      where: {},
    };
  }

  public async save(building: Building): Promise<Building> {
    const query = { code: building.code };

    const buildingDocument = await this.buildingSchema.findOne(query);

    try {
      if (buildingDocument === null) {
        const rawBuilding: any = BuildingMap.toPersistence(building);

        const buildingCreated = await this.buildingSchema.create(rawBuilding);

        return BuildingMap.toDomain(buildingCreated);
      } else {
        buildingDocument.code = building.code.value;
        buildingDocument.name = building.name;
        buildingDocument.length = building.length;
        buildingDocument.width = building.width;

        await buildingDocument.save();

        return building;
      }
    } catch (err) {
      throw err;
    }
  }

  public async getAll(): Promise<Building[]> {
    const buildingRecord = await this.buildingSchema.find();

    return buildingRecord.map(item => BuildingMap.toDomain(item));
  }

  public async findByCode(id: string): Promise<Building> {
    const record = await this.buildingSchema.findOne({ code: id });

    if (record != null) {
      return BuildingMap.toDomain(record);
    } else {
      return null;
    }
  }

  public async findAll(): Promise<Building[]> {
    const record = await this.buildingSchema.find();

    if (record != null) {
      const resultDTO = record.map(item => BuildingMap.toDomain(item));
      return resultDTO;
    } else {
      return null;
    }
  }

  exists(t: Building): Promise<boolean> {
    if (t === null) throw new Error('Building is null');

    if (this.findByCode(t.code.value) === null) {
      return Promise.resolve(false);
    }

    return Promise.resolve(true);
  }
}
