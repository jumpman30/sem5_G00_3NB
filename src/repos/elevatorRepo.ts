import { Service, Inject } from 'typedi';

import { Role } from '../domain/role/role';
import { RoleMap } from '../mappers/RoleMap';

import { Document, Model } from 'mongoose';
import IElevatorRepo from "./IRepos/IElevatorRepo";
import { IElevatorPersistence } from '../dataschema/IElevatorPersistence';
import { Elevator } from '../domain/elevator/elevator';
import { ElevatorMap } from '../mappers/ElevatorMap';

@Service()
export default class ElevatorRepo implements IElevatorRepo {
  private models: any;

  constructor(
    @Inject('elevatorSchema')
    private elevatorSchema: Model<IElevatorPersistence & Document>,
  ) {}

  exists(t: Elevator): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  private createBaseQuery(): any {
    return {
      where: {},
    };
  }

  public async save(elevator: Elevator): Promise<Elevator> {
    const query = { elevatorId: elevator.elevatorId.toString() };

    const elevatorDocument = await this.elevatorSchema.findOne(query);

    try {
      if (elevatorDocument === null) {
        const rawElevator: any = ElevatorMap.toPersistence(elevator);

        const elevatorCreated = await this.elevatorSchema.create(rawElevator);

        return ElevatorMap.toDomain(elevatorCreated);
      } else {
        //edit elevator
        //...
        await elevatorDocument.save();

        return elevator;
      }
    } catch (err) {
      throw err;
    }
  }

  public async countByBuilding(buildingId: string): Promise<number> {
    const query = { buildingId };

    try {
      return await this.elevatorSchema.count(query);
    } catch (err) {
      throw err;
    }
  }

  public async findByBuilding(buildingId: string): Promise<Elevator[]> {
    const query = {
      $or: [{ building1Id: buildingId }, { building2Id: buildingId }],
    };

    const elevators = await this.elevatorSchema.find(query);
    if (elevators) {
      return elevators.map(elevator => ElevatorMap.toDomain(elevator));
    } else {
      return null;
    }
  }
}
