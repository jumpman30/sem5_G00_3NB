import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from '../../config';
import { Result } from '../core/logic/Result';
import { BaseController } from '../core/infra/BaseController';
import IFloorController from './IControllers/IFloorController';
import { IFloorDto } from '../dto/IFloorDto';
import IFloorService from '../services/IServices/IFloorService';
import IBuildingController from './IControllers/IBuildingController';
import IBuildingService from '../services/IServices/IBuildingService';
import { IBuildingDto } from '../dto/IBuildingDto';

@Service()
export default class BuildingController extends BaseController
  implements IBuildingController {
  constructor(
    @Inject(config.services.building.name)
    private buildingService: IBuildingService,
  ) {
    super();
  }

  protected executeImpl(): Promise<any> {
    throw new Error('Method not implemented.');
  }

  public async createBuilding(req: Request, res: Response, next: NextFunction) {
    try {
      const buildingIdOrError = (await this.buildingService.save(
        req.body as IBuildingDto,
      )) as Result<{ buildingId: string }>;

      if (buildingIdOrError.isFailure) {
        return this.fail(buildingIdOrError.error.toString());
      }

      return this.ok(res, buildingIdOrError.getValue());
    } catch (e) {
      return next(e);
    }
  }
}
