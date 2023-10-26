import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IRobotController from "./IControllers/IRobotController";
import IRobotService from '../services/IServices/IRobotService';
import {IRobotDTO} from '../dto/IRobotDTO';

import { Result } from "../core/logic/Result";

@Service()
export default class RobotController implements IRobotController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
    @Inject(config.services.robot.name) private RobotServiceInstance : IRobotService
  ) {}

  public async createRobot(req: Request, res: Response, next: NextFunction) {
    try {
      const RobotOrError = await this.RobotServiceInstance.createRobot(req.body as IRobotDTO) as Result<IRobotDTO>;

      if (RobotOrError.isFailure) {
        return res.status(402).send();
      }

      const RobotDTO = RobotOrError.getValue();
      return res.json( RobotDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async updateRobot(req: Request, res: Response, next: NextFunction) {
    try {
      const RobotOrError = await this.RobotServiceInstance.updateRobot(req.body as IRobotDTO) as Result<IRobotDTO>;

      if (RobotOrError.isFailure) {
        return res.status(404).send();
      }

      const RobotDTO = RobotOrError.getValue();
      return res.status(201).json( RobotDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const RobotOrError = await this.RobotServiceInstance.getAll();

      if (RobotOrError.isFailure) {
        return res.status(404).send();
      }

      const RobotDTO = RobotOrError.getValue();
      return res.status(201).json( RobotDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  public async getRobot(req: Request, res: Response, next: NextFunction) {
    try {
      const RobotOrError = await this.RobotServiceInstance.getRobot(req.params.nickname) as Result<IRobotDTO>;

      if (RobotOrError.isFailure) {
        return res.status(404).send();
      }

      const RobotDTO = RobotOrError.getValue();
      return res.status(201).json( RobotDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  public async inactivateRobot(req: Request, res: Response, next: NextFunction) {
    try {
      const RobotOrError = await this.RobotServiceInstance.inactivateRobot(req.params.nickname) as Result<IRobotDTO>;

      if (RobotOrError.isFailure) {
        return res.status(404).send();
      }

      const RobotDTO = RobotOrError.getValue();
      return res.status(201).json( RobotDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  public async activateRobot(req: Request, res: Response, next: NextFunction) {
    try {
      const RobotOrError = await this.RobotServiceInstance.activateRobot(req.params.nickname) as Result<IRobotDTO>;

      if (RobotOrError.isFailure) {
        return res.status(404).send();
      }

      const RobotDTO = RobotOrError.getValue();
      return res.status(201).json( RobotDTO );
    }
    catch (e) {
      return next(e);
    }
  };
}
