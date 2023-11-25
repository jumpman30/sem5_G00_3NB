import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from '../../config';
import { Result } from '../core/logic/Result';
import { BaseController } from '../core/infra/BaseController';
import IFloorService from '../services/IServices/IFloorService';
import IBuildingController from './IControllers/IBuildingController';
import IBuildingService from '../services/IServices/IBuildingService';
import { IBuildingUpdateDto } from "../dto/IBuidlingUpdateDto";
import { IBuildingDto } from "../dto/IBuildingDto";

@Service()
export default class BuildingController extends BaseController
  implements IBuildingController {
  constructor(
    @Inject(config.services.building.name)
    private buildingService: IBuildingService,
    @Inject(config.services.floor.name)
    private floorService: IFloorService,
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
      return this.fail(e);
    }
  }

  public async updateBuilding(req: Request, res: Response, next: NextFunction) {
    try {
      const buildingUpdateOrError = await this.buildingService.update(req.body as IBuildingUpdateDto) as Result<IBuildingDto>

      if (buildingUpdateOrError.isFailure) {
        return res.status(400).json(buildingUpdateOrError.error.toString())
      }
      return this.ok(res, buildingUpdateOrError.getValue());
    } catch (e) {
        return this.fail(e);
    }
  }

  public async getBuildingByBuildingId(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const buildingId = req.query.buildingId as string;

      if (buildingId === undefined) {
        return res
          .status(404)
          .json('Please insert a valid building in the parameters.');
      }

      const buildingOrError = await this.buildingService.findBuildingByKey(
        buildingId,
      );

      if (buildingOrError.isFailure) {
        return res.status(404).json(buildingOrError.error);
      }

      const buildingDTO = buildingOrError.getValue();
      return res.status(200).json(buildingDTO);
    } catch (e) {
      return res.status(500).json(e);
    }
}

  public async getFloorsByBuildingId(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const floors = await this.floorService.getFloorsByBuildingId(
        req.params.buildingId,
      );
      console.log(floors);
      if (floors.isFailure) {
        return res.status(400).json(floors.errorValue().toString());
      }
      const floorDTOs = floors.getValue();
      return res.status(201).json(floorDTOs);
    } catch (e) {
      return next(e);
    }
  }

  public async getBuildingsByMinMax(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const minFloor = req.params.minFloor as string;
      const maxFloor = req.params.maxFloor as string;

      if (minFloor === undefined || maxFloor === undefined) {
        return res.status(400).json('Minimum and maximum floors are required.');
      }

      const result = await this.buildingService.getBuildingsByMinMax(
        minFloor,
        maxFloor,
      );

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
  public async getPassagesByBuildingId(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const PassagesOrError = await this.buildingService.getPassageFloors(
        req.params.id,
      );

      if (PassagesOrError.isFailure) {
        return res.status(404).send();
      }

      const RobotDTO = PassagesOrError.getValue();
      return res.status(201).json(RobotDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async getAllBuildings(req: Request, res: Response, next: NextFunction) {
    try {
      const buildings = await this.buildingService.getAllBuildings();

      if (buildings.isFailure) {
        return res.status(400).send();
      }
      return res.status(200).json(buildings.getValue());
    } catch (e) {
      return next(e);
    }
    return
  }
}
