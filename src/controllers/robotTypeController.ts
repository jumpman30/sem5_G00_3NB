import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from '../../config';

import { Result } from '../core/logic/Result';
import IRobotTypeController from './IControllers/IRobotTypeController';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import IRobotTypeService from '../services/IServices/IRobotTypeService';
import IRobotTypeDto from '../dto/IRobotTypeDTO';
import AlreadyExistsException from '../core/infra/AlreadyExistsException'

@Service()
export default class RobotTypeController
  implements IRobotTypeController 
  {

  constructor(
    @Inject(config.services.robotType.name)
    private robotTypeServiceInstance: IRobotTypeService,
  ) {}

  async getAll(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
    try {
      const RobotOrError = await this.robotTypeServiceInstance.getAll();

      if (RobotOrError.isFailure) {
        return res.status(404).send();
      }

      const RobotDTO = RobotOrError.getValue();
      return res.status(201).json( RobotDTO );
    }
    catch (e) {
      return next(e);
    }
  }


  public async createRobotType(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
    try {
      const robotTypeOrError = (await this.robotTypeServiceInstance.createRobotType(
        req.body as IRobotTypeDto,
      )) as Result<IRobotTypeDto>;

      if (robotTypeOrError.isFailure) {
        return res.status(422).send(robotTypeOrError.errorValue());
      }

      const robotTypeDto = robotTypeOrError.getValue();
      console.log(res)
      return res.json(robotTypeDto).status(201);
    } catch (e) {
      if(e instanceof AlreadyExistsException){
        return res.status(409).send();
      }
      return next(e);
    }
  }
}
