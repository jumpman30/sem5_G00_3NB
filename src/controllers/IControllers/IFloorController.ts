import { Request, Response, NextFunction } from 'express';

export default interface IFloorController {
  createFloor(req: Request, res: Response, next: NextFunction);
  patchFloorMap(req: Request, res: Response, next: NextFunction);
  getAllFloorsByBuildingId(req: Request, res: Response, next: NextFunction);
}
