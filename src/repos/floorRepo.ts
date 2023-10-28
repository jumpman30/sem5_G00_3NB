import { Service, Inject } from 'typedi';
import mongoose, { Document, Model } from 'mongoose';

import IFloorRepo from '../services/IRepos/IFloorRepo';
import { IFloorPersistence } from '../dataschema/IFloorPersistence';
import { Floor } from '../domain/floor';
import { FloorId } from '../domain/floorId';
import { FloorMap } from '../mappers/FloorMap';

@Service()
export default class FloorRepo implements IFloorRepo {
  constructor(
    @Inject('floorSchema')
    private floorSchema: Model<IFloorPersistence & Document>,
    @Inject('logger') private logger,
  ) {}

  public async save(floor: Floor): Promise<FloorId> {
    const rawFloor: any = FloorMap.toPersistence(floor);

    try {
      const floorDb = await this.floorSchema.create(rawFloor) as IFloorPersistence & mongoose.Document;
      return new FloorId(floorDb.domainId);
    } catch (e) {
      throw e;
    }
  }
}