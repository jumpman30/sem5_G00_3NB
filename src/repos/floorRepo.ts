import { Service, Inject } from 'typedi';
import mongoose, { Document, Model } from 'mongoose';

import IFloorRepo from "./IRepos/IFloorRepo";
import { IFloorPersistence } from '../dataschema/IFloorPersistence';
import { Floor } from '../domain/floor/floor';
import { FloorId } from '../domain/floor/floorId';
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

  public async editSave (floor: Floor): Promise<Floor> {
    const query = { domainId: floor.id };

    const floorDocument = await this.floorSchema.findOne( query );

    try {
      if (floorDocument === null ) {
        const rawFloor: any = FloorMap.toPersistence(floor);

        const floorCreated = await this.floorSchema.create(rawFloor);

        return FloorMap.toDomain(floorCreated);
      } else {

        floorDocument.number = floor.number;
        floorDocument.buildingId = floor.buildingId;
        floorDocument.floorMap = floor.floorMap;

        console.log(await floorDocument.save());

        return floor;
      }
    } catch (err) {
      throw err;
    }
  }
  public async findByBuildingId(buildingId: string): Promise<Floor[] | null> {
    try {

      const floors = await this.floorSchema.find({ buildingId }).exec();

      if (floors && floors.length > 0) {
        const domainFloors = floors.map((floorDb) => FloorMap.toDomain(floorDb));
                return domainFloors;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }


  public async findById(id: string): Promise<Floor> {
    const query = { domainId: id};

    const document = await this.floorSchema.findOne(query);
    if (document != null) {
      return FloorMap.toDomain(document);
    } else return null;
  }
}
