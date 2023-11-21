import { Service, Inject } from 'typedi';
import mongoose, { Document, Model } from 'mongoose';

import { FloorId } from '../domain/floorId';
import IFloorMapRepo from '../services/IRepos/IFloorMapRepo';
import { FloorMapMapping } from '../mappers/FloorMapMapping';
import { FloorMap } from '../domain/floorMap';

@Service()
export default class FloorMapRepo implements IFloorMapRepo {
  constructor(
    @Inject('floorMapSchema')
    private floorMapSchema: Model<IFloorMapRepo & Document>,
  ) {}


  public async findAll(): Promise<FloorMap[]> {
    return (await this.floorMapSchema.find().exec()).map(i=> FloorMapMapping.toDomain(i));
  }

  public async save(floorMap: FloorMap): Promise<FloorMap> {
    const rawFloor: any = FloorMapMapping.toPersistence(floorMap);

    try {
      const floorDb = await this.floorMapSchema.create(rawFloor) as IFloorMapRepo & mongoose.Document;
      return floorMap;
    } catch (e) {
      throw e;
    }
  }
}
