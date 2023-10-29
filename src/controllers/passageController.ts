import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from '../../config';
import { Result } from '../core/logic/Result';
import { BaseController } from '../core/infra/BaseController';
import IFloorController from './IControllers/IFloorController';
import { IFloorDto } from '../dto/IFloorDto';
import IFloorService from '../services/IServices/IFloorService';
import IPassageController from './IControllers/IPassageController';
import IPassageService from '../services/IServices/IPassageService';
import { IPassageDto } from '../dto/IPassageDto';

@Service()
export default class PassageController extends BaseController
  implements IPassageController {
  constructor(
    @Inject(config.services.passage.name)
    private passageService: IPassageService,
  ) {
    super();
  }

  protected executeImpl(): Promise<any> {
    throw new Error('Method not implemented.');
  }

  public async createPassage(req: Request, res: Response, next: NextFunction) {
    try {
      const passageIdOrError = (await this.passageService.save(
        req.body as IPassageDto,
      )) as Result<{ passageId: string }>;

      if (passageIdOrError.isFailure) {
        return this.fail(passageIdOrError.error.toString());
      }

      return this.ok(res, passageIdOrError.getValue());
    } catch (e) {
      return next(e);
    }
  }
}
