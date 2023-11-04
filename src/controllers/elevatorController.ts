import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from '../../config';
import { Result } from '../core/logic/Result';
import { BaseController } from '../core/infra/BaseController';
import IFloorController from './IControllers/IFloorController';
import { IFloorDto } from '../dto/IFloorDto';
import IFloorService from '../services/IServices/IFloorService';
import IElevatorService from '../services/IServices/IElevatorService';
import { IElevatorDto } from '../dto/IElevatorDto';
import IElevatorController from './IControllers/IElevatorController';

@Service()
export default class ElevatorController extends BaseController
  implements IElevatorController {
  constructor(
    @Inject(config.services.elevator.name)
    private elevatorService: IElevatorService,
  ) {
    super();
  }

  protected executeImpl(): Promise<any> {
    throw new Error('Method not implemented.');
  }

  public async createElevator(req: Request, res: Response, next: NextFunction) {
    try {
      const elevatorOrError = (await this.elevatorService.createElevator(
        {...req.body, buildingId: req.params.buildingId} as IElevatorDto,
      )) as Result<IElevatorDto>;
        console.log(elevatorOrError)
      if (elevatorOrError.isFailure) {
        return this.clientError(elevatorOrError.error as string)
      }

      return this.ok(res, elevatorOrError.getValue());
    } catch (e) {
      return next(e);
    }
  }
}
