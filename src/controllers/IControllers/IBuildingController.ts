import { Request, Response, NextFunction } from 'express';
import { ParamsDictionary } from "express-serve-static-core";
import * as QueryString from "querystring";
export default interface IBuildingController {
  createBuilding(req: Request, res: Response, next: NextFunction);
  getFloorsByBuildingId(req: Request, res: Response, next: NextFunction);
  getBuildingsByMinMax(req: Request, res: Response, next: NextFunction);
  getPassagesByBuildingId(req: Request, res: Response, next: NextFunction);
  updateBuilding(req: Request, res: Response, next: NextFunction);
  getAllBuildings(req: Request, res: Response, next: NextFunction);
  getBuildingByBuildingId(req: Request, res: Response, next: NextFunction);
}
