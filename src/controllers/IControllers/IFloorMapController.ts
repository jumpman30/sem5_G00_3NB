import { Request, Response, NextFunction } from 'express';

export default interface IFloorController {
  createFloorMap(req: Request, res: Response, next: NextFunction);
  getAll(req: Request, res: Response, next: NextFunction);
}
