import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from '../../config';
import { Result } from '../core/logic/Result';
import { BaseController } from '../core/infra/BaseController';
import IRoomController from './IControllers/IRoomController';
import IRoomService from '../services/IRepos/IRoomService';
import { IRoomDto } from '../dto/IRoomDto';

@Service()
export default class RoomController extends BaseController
  implements IRoomController {
  constructor(
    @Inject(config.services.room.name)
    private roomServiceInstance: IRoomService,
  ) {
    super();
  }

  protected executeImpl(): Promise<any> {
    throw new Error('Method not implemented.');
  }

  public async createRoom(req: Request, res: Response, next: NextFunction) {
    try {
      const roomIdOrError = (await this.roomServiceInstance.save(
        req.body as IRoomDto,
      )) as Result<{ roomId: string }>;

      if (roomIdOrError.isFailure) {
        return this.fail(roomIdOrError.error.toString());
      }

      return this.ok(res, roomIdOrError.getValue());
    } catch (e) {
      return next(e);
    }
  }
}
