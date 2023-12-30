import { Inject, Service } from "typedi";
import config from "../../config";
import { NextFunction, Request, Response } from "express";
import { Result } from "../core/logic/Result";

import ITaskService from "../services/IServices/ITaskService";
import ITaskController from "./IControllers/ITaskController";
import { requestPickupDeliveryTaskDto, requestSurveillanceTaskDto, responseTaskDto } from "../dto/ITaskDto";

@Service()
export default class TaskController
  implements ITaskController {
  constructor(
    @Inject(config.services.task.name)
    private taskService: ITaskService
  ) {
  }

  public async createSurveillanceTask(
    req: Request,
    res: Response,
    _next: NextFunction
  ) {
    try {
      const taskOrError = (await this.taskService.save(
        req.body as requestSurveillanceTaskDto,
      )) as Result<responseTaskDto>;

      if (taskOrError.isFailure) {
        return res.status(404).send();
      }
      return res.status(201).json(taskOrError.getValue());
    } catch (e) {
      return res.status(500).json(e);
    }
  }

  public async createPickupDeliveryTask(
      req: Request,
      res: Response,
      _next: NextFunction
    ) {
      try {
        const taskOrError = (await this.taskService.save(
          req.body as requestPickupDeliveryTaskDto,
        )) as Result<responseTaskDto>;

        if (taskOrError.isFailure) {
          return res.status(404).send();
        }
        return res.status(201).json(taskOrError.getValue());
      } catch (e) {
        return res.status(500).json(e);
      }
    }

  public async getAllTasks(
    req: Request,
    res: Response,
    _next: NextFunction
  ) {

    try {
      const taskOrError = await this.taskService.getAllTasks();

      if (taskOrError.isFailure) {
        return res.status(404).send();
      }

      const responseTaskDTO = taskOrError.getValue();
      return res.status(201).json( responseTaskDTO );
    }
    catch (e) {
      return res.status(500).json(e);
    }
  }

  public async getTaskByTaskId(
    req: Request,
    res: Response,
    _next: NextFunction
  ) {    try {
      const taskOrError = await this.taskService.getTaskById(req.params.taskId)
      if (taskOrError.isFailure) {
        return res.status(404).send();
      }

      const responseTaskDTO = taskOrError.getValue();
      return res.status(201).json( responseTaskDTO );
    }
    catch (e) {
      return res.status(500).json(e);
    }
  }
}
