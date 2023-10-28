import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from '../../config';
import { Result } from '../core/logic/Result';
import { BaseController } from '../core/infra/BaseController';
import IFloorController from './IControllers/IFloorController';
import { IFloorDto } from '../dto/IFloorDto';
import IFloorService from '../services/IServices/IFloorService';

@Service()
export default class FloorController extends BaseController
  implements IFloorController {
  constructor(
    @Inject(config.services.floor.name)
    private floorService: IFloorService,
  ) {
    super();
  }

  protected executeImpl(): Promise<any> {
    throw new Error('Method not implemented.');
  }

  public async createFloor(req: Request, res: Response, next: NextFunction) {
    try {
      const floorIdOrError = (await this.floorService.save(
        req.body as IFloorDto,
      )) as Result<{ floorId: string }>;

      if (floorIdOrError.isFailure) {
        return this.fail(floorIdOrError.error.toString());
      }

      return this.ok(res, floorIdOrError.getValue());
    } catch (e) {
      return next(e);
    }
  }
}