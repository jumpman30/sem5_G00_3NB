import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from '../../config';
import { Result } from '../core/logic/Result';

import { BaseController } from '../core/infra/BaseController';

import { IFloorDto } from '../dto/IFloorDto';
import IFloorService from '../services/IServices/IFloorService';

import IBuildingController from "./IControllers/IBuildingController";
import IBuildingService from "../services/IServices/IBuildingService";


class ICreateBuildingDto {
}

@Service()
export default class BuildingController extends BaseController
  implements IBuildingController {
  constructor(
    @Inject(config.services.building.name)
    private buildingService: IBuildingService,
    @Inject(config.services.floor.name)
    private floorService: IFloorService
  ) {
    super();
  }

  protected executeImpl(): Promise<any> {
    throw new Error('Method not implemented.');
  }

  public async createBuilding(req: Request, res: Response, next: NextFunction) {
    try {
      const requestDto = req.body as ICreateBuildingDto;
      //validate DTO
      if (!requestDto)
        return res.status(422).json({message: 'Invalid building data'}); //invalid data

      const buildingOrError = await this.buildingService.createBuilding(requestDto);

      if (buildingOrError.isFailure) {
        return res.status(400).json({errors: buildingOrError.errorValue()}); // Bad Request response
      }

      const buildingDTO = buildingOrError.getValue();
      return res.json(buildingDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

  public async findBuildingByKey(req: Request, res: Response, next: NextFunction) {
    try {
        const buildingId= req.query.buildingId as string;

        if (buildingId === undefined) {
            return res.status(404).json("Please insert a valid building in the parameters.");
        }

        const buildingOrError = await this.buildingService.findBuildingByKey(buildingId);

        if (buildingOrError.isFailure) {
            return res.status(404).json(buildingOrError.error);
        }

        const buildingDTO = buildingOrError.getValue();
        return res.status(200).json(buildingDTO);
    } catch (e) {
        return next(e);
    }
}

public async getFloorsByBuildingId(req: Request, res: Response, next: NextFunction) {
  try {

    const buildingId = req.query.buildingId as string;

    if (buildingId === undefined) {
      return res.status(404).json("Building not found");
    } else {

      const floors = await this.floorService.getFloorsByBuildingId(buildingId);

      if (floors.isFailure) {
        return Result.fail<IFloorDto[]>(floors.errorValue());
      }
      const floorDTOs = floors.getValue();
      return Result.ok<IFloorDto[]>(floorDTOs);
    }
  } catch (e) {
    throw e;
  }
}

public async getBuildingsByMinMax(req: Request, res: Response, next: NextFunction) {
  try {
    const minFloor = req.query.minFloor as string;
    const maxFloor = req.query.maxFloor as string;

    if (minFloor === undefined || maxFloor === undefined) {
      return res.status(400).json("Minimum and maximum floors are required.");
    }

    const result = await this.buildingService.getBuildingsByMinMax(minFloor, maxFloor);

    if (result.isSuccess) {
      const buildingDTOs = result.getValue();
      return this.ok(res, buildingDTOs);
    } else {
      return this.fail(result.error.toString());
    }
  } catch (e) {
    return next(e);
  }
}
}
}

export default BuildingController;
