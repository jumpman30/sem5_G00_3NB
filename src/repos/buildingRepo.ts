import {Inject, Service} from 'typedi';
import {Document, Model} from 'mongoose';

import {IBuildingPersistence} from '../dataschema/IBuildingPersistence';

import {Building} from '../domain/building/Building';
import {BuildingMap} from '../mappers/BuildingMap';

import IBuildingRepo from '../services/IRepos/IBuildingRepo';
import { after } from "lodash";

@Service()
export default class BuildingRepo implements IBuildingRepo {

  constructor(
    @Inject('buildingSchema')
    private buildingSchema: Model<IBuildingPersistence & Document>,
  ) {}

  public async save(building: Building): Promise<Building> {
    const query = { code: building.code };

    const buildingDocument = await this.buildingSchema.findOne(query);

    try {
      if (buildingDocument === null) {
        const rawBuilding: any = BuildingMap.toPersistence(building);

        const buildingCreated = await this.buildingSchema.create(rawBuilding);
        return BuildingMap.toDomain(buildingCreated);

      } else {
        buildingDocument.name = building.name ?? buildingDocument.name;
        buildingDocument.length = building.length ?? buildingDocument.length;
        buildingDocument.width = building.width ?? buildingDocument.width;

        const buildingUpdated = await this.buildingSchema.findOneAndUpdate(query, buildingDocument, after);

        return BuildingMap.toDomain(buildingUpdated);
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByCode(code: string): Promise<Building> {
    const record = await this.buildingSchema.findOne({ code: code });

    if (record != null) {
      return BuildingMap.toDomain(record);
    } else {
      return null;
    }
  }

  public async getAllBuildings(): Promise<Building[]> {
    const record = await this.buildingSchema.find();

    if (record != null) {
      return record.map(item => BuildingMap.toDomain(item));
    } else {
      return null;
    }
  }
  public async exists(building: Building): Promise<boolean> {
    if(building == null) {
      throw new Error("Building is null");
    }
    let code = building.code.toString();

    const record = await this.buildingSchema.findOne({ code: code });

    if (!record) {
      return Promise.resolve(false);
    } else {
      return Promise.resolve(true);
    }
  }
}
