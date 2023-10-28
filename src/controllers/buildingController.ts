import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from '../../config';

import IBuildingController from './IControllers/IBuildingController';
import IBuildingService from '../services/IServices/IBuildingService';

import { ICreateBuildingDTO } from '../dto/IBuildingDTO';

@Service()
class BuildingController implements IBuildingController {
  constructor(
    @Inject(config.services.building.name)
    private buildingServiceInstance: IBuildingService,
  ) {}

  public async createBuilding(req: Request, res: Response, next: NextFunction) {
    try {
      const requestDto = req.body as ICreateBuildingDTO;
      //validate DTO
      if (!requestDto)
        return res.status(422).json({ message: 'Invalid building data' }); //invalid data

      const buildingOrError = await this.buildingServiceInstance.createBuilding(requestDto);

      if (buildingOrError.isFailure) {
        return res.status(400).json({ errors: buildingOrError.errorValue() }); // Bad Request response
      }

      const buildingDTO = buildingOrError.getValue();
      return res.json(buildingDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }
}

export default BuildingController;
