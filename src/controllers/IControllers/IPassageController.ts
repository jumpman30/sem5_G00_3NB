import { Request, Response, NextFunction } from 'express';

export default interface IPassageController {
  createPassage(req: Request, res: Response, next: NextFunction);
  updatePassageByDomainId(req: Request, res: Response, next: NextFunction);
  findPassagesBetweenTwoBuildings(req: Request, res: Response, next: NextFunction);
}
