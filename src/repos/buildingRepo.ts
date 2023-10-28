import { Service, Inject } from 'typedi';
import { Document, Model } from 'mongoose';
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
}
