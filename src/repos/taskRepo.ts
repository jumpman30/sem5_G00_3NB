import { Inject, Service } from "typedi";
import { Task } from "../domain/task/Task";
import ITaskRepo from "./IRepos/ITaskRepo";

import { Document, FilterQuery, Model } from "mongoose";
import { ITaskPersistence } from "../dataschema/ITaskPersistence";

import { TaskId } from "../domain/task/TaskId";
import { SurveillanceTaskMap } from "../mappers/SurveillanceTaskMap";
import { PickupDeliveryTaskMap } from "../mappers/PickupDeliveryTaskMap";
import { TaskType } from "../domain/task/TaskType";
import { TaskMapper } from "../mappers/TaskMap";

@Service()
export default class TaskRepo implements ITaskRepo {
  constructor(
    @Inject("SurveillanceTaskSchema")
    private surveillanceTaskSchema: Model<ITaskPersistence & Document>,
    @Inject("DeliveryTaskSchema")
    private pickupDeliveryTaskSchema: Model<ITaskPersistence & Document>
  ) {}

  public async save(taskData: Task) : Promise<{ warning?: string; task: Task; }> {
    const query = { taskId: taskData.id.toString() };

    switch (taskData.type) {
      case TaskType.Surveillance : {
        const existingTask = await this.surveillanceTaskSchema.findOne(query);
        if (existingTask) {
          return { warning: 'Surveillance task already exists', task: SurveillanceTaskMap.toDomain(existingTask) };
        } else {
          const rawTask = SurveillanceTaskMap.toPersistence(taskData);
          const taskCreated = await this.surveillanceTaskSchema.create(rawTask);
          return { task: SurveillanceTaskMap.toDomain(taskCreated) };
        }
      }
      case TaskType.PickupAndDelivery :{
        const existingTask = await this.pickupDeliveryTaskSchema.findOne(query);
        if (existingTask) {
          return { warning: 'Pickup and Delivery task already exists', task: PickupDeliveryTaskMap.toDomain(existingTask) };
        } else {
          const rawTask = PickupDeliveryTaskMap.toPersistence(taskData);
          const taskCreated = await this.pickupDeliveryTaskSchema.create(rawTask);
          return { task: PickupDeliveryTaskMap.toDomain(taskCreated) };
        }
      }
      default:
        return { warning: 'Task type undetermined!', task: taskData};
    }
  }

  public async findByTaskType(taskType: TaskType | string): Promise<Task> {

    switch (taskType) {
      case TaskType.Surveillance : {
        const taskRecord = await this.surveillanceTaskSchema.find();
        if (taskRecord != null) {
          return SurveillanceTaskMap.toDomain(taskRecord);
        } else return null;
      }
      case TaskType.PickupAndDelivery :{
        const taskRecord = await this.pickupDeliveryTaskSchema.find();
        if (taskRecord != null) {
          return PickupDeliveryTaskMap.toDomain(taskRecord);
        } else return null;
      }
      default:
        return null;
    }
  }

  async getAllTasks() {
    const surveillanceTasks = await this.surveillanceTaskSchema.find();
    const pickupDeliveryTasks = await this.pickupDeliveryTaskSchema.find();

    return [
      ...SurveillanceTaskMap.toDomain(surveillanceTasks) as unknown as Task[],
      ...PickupDeliveryTaskMap.toDomain(pickupDeliveryTasks) as unknown as Task[],
    ];
  }

  public async update(task: Task): Promise<Task> {
    try {
      const taskId = task.taskId;
      const taskType = task.type;

      switch (taskType) {
        case TaskType.Surveillance : {
          const taskRecord = await this.surveillanceTaskSchema.findByIdAndUpdate({ taskId }, SurveillanceTaskMap.toPersistence(task), { new: true });
          if (taskRecord != null) {
            return SurveillanceTaskMap.toDomain(taskRecord);
          } else return null;
        }
        case TaskType.PickupAndDelivery : {
          const taskRecord = await this.pickupDeliveryTaskSchema.findByIdAndUpdate({ taskId }, SurveillanceTaskMap.toPersistence(task), { new: true });
          if (taskRecord != null) {
            return PickupDeliveryTaskMap.toDomain(taskRecord);
          } else return null;
        }
        default:
          return null;
      }
    } catch (e) {
        throw e; //TODO: Implement error management
    }
  }

  async delete(task: Task): Promise<Task | null> {
    try {
      const taskId = task.taskId;
      const taskType = task.type;

      switch (taskType) {
        case TaskType.Surveillance : {
          const taskRecord = await this.surveillanceTaskSchema.findByIdAndDelete(taskId);
          if (taskRecord) {
            return SurveillanceTaskMap.toDomain(taskRecord);
          }
          break;
        }
        case TaskType.PickupAndDelivery : {
          const taskRecord = await this.pickupDeliveryTaskSchema.findByIdAndDelete(taskId);
          if (taskRecord) {
            return PickupDeliveryTaskMap.toDomain(taskRecord);
          }
          break;
        }
        default:
          return null;
      }
    } catch (e) {
      // TODO: Implement specific error handling or logging if necessary
      throw e;
    }

    return null; // Return null if task type does not match or if deletion is unsuccessful
  }

  public async exists(task: TaskId | string): Promise<boolean> {
    const idX =
      task instanceof TaskId ? (<TaskId>task).toValue() : task;

    const query = { taskId: idX };
    const taskDocument = await this.pickupDeliveryTaskSchema.findOne(
      query as FilterQuery<ITaskPersistence & Document>,
    );

    return !!taskDocument === true;
  }

  public async findByTaskId(taskId: TaskId | string): Promise<Task> {
    const taskRecord = await this.surveillanceTaskSchema.findOne({ taskId: taskId });
    if (taskRecord != null) {
      return TaskMapper.toDomain(taskRecord);
    } else return null;
  }
}
