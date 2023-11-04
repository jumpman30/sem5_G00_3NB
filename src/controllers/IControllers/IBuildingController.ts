import { Request, Response, NextFunction } from 'express';
import {IBuildingResponseDto} from "../../dto/IBuildingDto";
import {IFloorDto} from "../../dto/IFloorDto";

export default interface IBuildingController {
  createBuilding(req: Request, res: Response, next: NextFunction);
  getAllBuildings(req: Request, res: Response, next: NextFunction);
  getBuilding(req: Request, res: Response, next: NextFunction);
  getBuildingsByMinMax(req: Request, res: Response, next: NextFunction);
  getFloorsByBuildingId(req: Request, res: Response, next: NextFunction);
  getPassagesByBuildingId(req: Request, res: Response, next: NextFunction);
}
