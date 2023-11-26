import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from '../../config';
import { Result } from '../core/logic/Result';
import { BaseController } from '../core/infra/BaseController';
import IFloorController from './IControllers/IFloorController';
import { IFloorDto } from '../dto/IFloorDto';
import IFloorService from '../services/IServices/IFloorService';
import { FloorMap } from '../domain/floorMap';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

@Service()
export default class extends BaseController
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

  public async getAllFloorsByBuildingId(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
    try {
      const floorIdOrError = (await this.floorService.getFloorsByBuildingId(
        req.query.buildingId as string,
      )) as Result<[IFloorDto]>;

      if (floorIdOrError.isFailure) {
        return this.fail(floorIdOrError.error.toString());
      }

      return this.ok(res, floorIdOrError.getValue());
    } catch (e) {
      return next(e);
    }
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

  public async patchFloorMap(req: Request, res: Response, next: NextFunction) {
    try {
      const floorIdOrError = (await this.floorService.patchFloorMap(
        req.body as FloorMap,
      )) as Result<IFloorDto>;

      if (floorIdOrError.isFailure) {
        return this.fail(floorIdOrError.error.toString());
      }

      return this.ok(res, floorIdOrError.getValue());
    } catch (e) {
      return next(e);
    }
  }
}
