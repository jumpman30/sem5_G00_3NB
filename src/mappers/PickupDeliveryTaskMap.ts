import { Mapper } from '../core/infra/Mapper';
import { Document, Model } from 'mongoose';
import { ITaskPersistence } from '../dataschema/ITaskPersistence';
import { PickupDeliveryTask } from '../domain/task/PickupDeliveryTask';

export class PickupDeliveryTaskMap extends Mapper<PickupDeliveryTask> {
  static toDTO(pickupDeliveryTask: PickupDeliveryTask): any {
    return {
      taskId: pickupDeliveryTask.taskId,
      user: pickupDeliveryTask.user,
      taskType: pickupDeliveryTask.type,
      taskStatus: pickupDeliveryTask.status,
      createdAt: pickupDeliveryTask.createdAt,
      updatedAt: pickupDeliveryTask.updatedAt,
      pickupRoomId: pickupDeliveryTask.pickupRoomId,
      deliveryRoomId: pickupDeliveryTask.deliveryRoomId,
      deliveryConfirmationCode: pickupDeliveryTask.deliveryConfirmationCode,
      description: pickupDeliveryTask.description,
    };
  }

  public static toDomain(
    raw: any | Model<ITaskPersistence & Document>,
  ): PickupDeliveryTask {
    const taskOrError = PickupDeliveryTask.create(raw);
    taskOrError.isFailure ? console.log(taskOrError.error) : '';
    return taskOrError.isSuccess ? taskOrError.getValue() : null;
  }

  static toPersistence(pickupDeliveryTask) {
    return {
      taskId: pickupDeliveryTask.taskId,
      user: pickupDeliveryTask.user,
      taskType: pickupDeliveryTask.type,
      taskStatus: pickupDeliveryTask.status,
      pickupRoomId: pickupDeliveryTask.pickupRoomId,
      deliveryRoomId: pickupDeliveryTask.deliveryRoomId,
      deliveryConfirmationCode: pickupDeliveryTask.deliveryConfirmationCode,
      description: pickupDeliveryTask.description,
    };
  }
}
