import { SurveillanceTask } from '../domain/task/SurveillanceTask';
import { Mapper } from '../core/infra/Mapper';
import { Document, Model } from 'mongoose';
import { ITaskPersistence } from '../dataschema/ITaskPersistence';

export class SurveillanceTaskMap extends Mapper<SurveillanceTask> {
  static toDTO(surveillanceTask: SurveillanceTask): any {
    return {
      taskId: surveillanceTask.taskId,
      user: surveillanceTask.user,
      taskType: surveillanceTask.type,
      taskStatus: surveillanceTask.status,
      createdAt: surveillanceTask.createdAt,
      updatedAt: surveillanceTask.updatedAt,
      buildingId: surveillanceTask.buildingId,
      floorId: surveillanceTask.floorId,
      emergencyContact: surveillanceTask.emergencyContact,
    };
  }

  public static toDomain(
    raw: any | Model<ITaskPersistence & Document>,
  ): SurveillanceTask {
    const taskOrError = SurveillanceTask.create(raw);
    taskOrError.isFailure ? console.log(taskOrError.error) : '';
    return taskOrError.isSuccess ? taskOrError.getValue() : null;
  }

  static toPersistence(surveillanceTask) {
    return {
      taskId: surveillanceTask.taskId.id.toString(),
      user: surveillanceTask.user,
      taskType: surveillanceTask.taskType,
      taskStatus: surveillanceTask.taskStatus,
      pickupRoomId: surveillanceTask.pickupRoomId,
      deliveryRoomId: surveillanceTask.deliveryRoomId,
      deliveryConfirmationCode: surveillanceTask.deliveryConfirmationCode,
      description: surveillanceTask.description,
    };
  }
}
