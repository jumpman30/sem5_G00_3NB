import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from '../../config';
import { Result } from '../core/logic/Result';
import { BaseController } from '../core/infra/BaseController';
import IFloorController from './IControllers/IFloorController';
import { IFloorDto } from '../dto/IFloorDto';
import IFloorService from '../services/IServices/IFloorService';
import IFloorMapController from './IControllers/IFloorMapController';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import IFloorMapService from '../services/IServices/IFloorMapService';
import { FloorMap } from '../domain/floorMap';

@Service()
export default class FloorMapController extends BaseController
  implements IFloorMapController {
  constructor(
    @Inject(config.services.floorMap.name)
    private floorMapService: IFloorMapService,
  ) {
    super();
  }

  public async createFloorMap(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
    try {
      const floorMapOrError = (await this.floorMapService.save(
        req.body as FloorMap,
      )) as Result<{ floorId: string }>;

      if (floorMapOrError.isFailure) {
        return this.fail(floorMapOrError.error.toString());
      }

      return this.ok(res, floorMapOrError.getValue());
    } catch (e) {
      return next(e);
    }
  }
  public async getAll(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
    return res.status(200).json(await this.floorMapService.getAll());
  }

  protected executeImpl(): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
