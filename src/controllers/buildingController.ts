import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from '../../config';
import { Result } from '../core/logic/Result';
import { BaseController } from '../core/infra/BaseController';
import IFloorService from '../services/IServices/IFloorService';
import IBuildingController from './IControllers/IBuildingController';
import IBuildingService from '../services/IServices/IBuildingService';
import IBuildingDto, { IBuildingCreateRequestDto, IBuildingUpdateRequestDto } from "../dto/IBuildingDto";
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

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

  getAllBuildings(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        throw new Error('Method not implemented.');
    }

  protected executeImpl(): Promise<any> {
    throw new Error('Method not implemented.');
  }

  public async createBuilding(req: Request, res: Response, next: NextFunction) {
    try {
      const requestDto = req.body as IBuildingCreateRequestDto;
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

  public async updateBuilding(req: Request, res: Response, next: NextFunction) {
    try {
      const requestDto = req.body as IBuildingDto;
      //validate DTO
      if (!requestDto)
        return res.status(422).json({message: 'Invalid building data'}); //invalid data

      const buildingOrError = await this.buildingService.updateBuilding(requestDto, requestDto.code);

      if (buildingOrError.isFailure) {
        return res.status(404).json({errors: buildingOrError.errorValue()}); // Bad Request response
      }

      const buildingDTO = buildingOrError.getValue();
      return res.json(buildingDTO).status(200);
    } catch (e) {
      return next(e);
    }
  }

  public async getBuilding(req: Request, res: Response, next: NextFunction) {
    try {
      const buildingOrError = await this.buildingService.findBuildingByCode(req.params.code) as Result<IBuildingDto>;

      if (buildingOrError.isFailure) {
        return res.status(404).send();
      }

      const buildingDto = buildingOrError.getValue();
      return res.json(buildingDto).status(200);
    } catch (e) {
      return next(e);
    }
  };

  public async getFloorsByBuildingId(req: Request, res: Response, next: NextFunction) {
    try {

      const buildingId = req.query.buildingId as string;

      if (buildingId === undefined) {
        return res.status(422).json({message: 'Invalid building data'}); //invalid data
      } else {

        const floorsOrError = await this.floorService.getFloorsByBuildingId(buildingId);

        if (floorsOrError.isFailure) {
          return res.status(404).json(floorsOrError.error); //Not found
        }
        const floorDTOs = floorsOrError.getValue();
        return res.status(200).json(floorDTOs);
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

  public async getPassagesByBuildingId(req: Request, res: Response, next: NextFunction){
    try {
      const PassagesOrError = await this.buildingService.getPassageFloors(req.params.id);

      if (PassagesOrError.isFailure) {
        return res.status(404).send();
      }

      const passageDTO = PassagesOrError.getValue();
      return res.status(201).json( passageDTO );
    }
    catch (e) {
      return next(e);
    }
  }
}
