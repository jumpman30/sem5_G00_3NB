import { Inject, Service } from "typedi";
import { Document, Model } from "mongoose";
import IRoomRepo from "./IRepos/IRoomRepo";
import { IRoomPersistence } from "../dataschema/IRoomPersistence";
import { Room } from "../domain/room/room";
import { RoomId } from "../domain/room/roomId";
import { RoomMap } from "../mappers/RoomMap";

@Service()
export default class RoomRepo implements IRoomRepo {
  constructor(
    @Inject('roomSchema')
    private roomSchema: Model<IRoomPersistence & Document>,
    @Inject('logger') private logger,
  ) {}

  public async save(room: Room): Promise<RoomId> {
    const rawRoom: any = RoomMap.toPersistence(room);

    try {
      await this.roomSchema.create(rawRoom);
      return room.id;
    } catch (e) {
      throw e;
    }
  }
}
