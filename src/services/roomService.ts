import { Service, Inject } from 'typedi';
import config from '../../config';
import { IUserDTO } from '../dto/IUserDTO';
import { Result } from '../core/logic/Result';
import IRoomService from './IRepos/IRoomService';
import IRoomRepo from './IRepos/IRoomRepo';
import { IRoomDto } from '../dto/IRoomDto';
import { Room } from '../domain/room';
import { Location } from '../domain/location';

@Service()
export default class RoomService implements IRoomService {
  constructor(
    @Inject(config.repos.room.name) private roomRepo: IRoomRepo,
    @Inject('logger') private logger,
  ) {}

  public async save(roomDto: IRoomDto): Promise<Result<{ roomId: string }>> {
    const doorLocation = Location.create(
      roomDto?.doorLocation?.x,
      roomDto?.doorLocation?.y,
    );
    const location = Location.create(
      roomDto?.location?.x,
      roomDto?.location?.y,
    );

    if (location.isFailure || doorLocation.isFailure) {
      throw new Error('Invalid location coordinates');
    }

    const roomOrError = Room.create({
      buildingId: roomDto.buildingId,
      floorId: roomDto.floorId,
      designation: roomDto.designation,
      doorLocation: doorLocation.getValue(),
      location: location.getValue(),
    });

    if (roomOrError.isFailure) {
      throw Result.fail<IUserDTO>(roomOrError.errorValue());
    }

    try {
      const roomId = await this.roomRepo.save(roomOrError.getValue());
      return Result.ok<{ roomId: string }>({ roomId: roomId.toString() });
    } catch (e) {
      throw e;
    }
  }
}
