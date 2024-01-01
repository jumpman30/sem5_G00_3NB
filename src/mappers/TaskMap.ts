import { SurveillanceTask } from "../domain/task/SurveillanceTask";
import { PickupDeliveryTask } from "../domain/task/PickupDeliveryTask";
import { requestPickupDeliveryTaskDto, requestSurveillanceTaskDto } from "../dto/ITaskDto";
import { Document, Model } from "mongoose";
import { ITaskPersistence } from "../dataschema/ITaskPersistence";
import { Task } from "../domain/task/Task";

export class TaskMapper {

  static toDto<T extends SurveillanceTask | PickupDeliveryTask | Task >(task: T): requestSurveillanceTaskDto | requestPickupDeliveryTaskDto {
    if (task instanceof SurveillanceTask) {
      return this.mapSurveillanceTaskToDto(task);
    } else if (task instanceof PickupDeliveryTask) {
      return this.mapPickupDeliveryTaskToDto(task);
    }

    throw new Error('Unsupported task type');
  }

  static toPersistence<T extends SurveillanceTask | PickupDeliveryTask >(task: T): requestSurveillanceTaskDto | requestPickupDeliveryTaskDto {
    if (task instanceof SurveillanceTask) {
      return this.mapSurveillanceTaskToPersistence(task);
    } else if (task instanceof PickupDeliveryTask) {
      return this.mapPickupDeliveryTaskToPersistence(task);
    }

    throw new Error('Unsupported task type');
  }

  static toDomain(task: Document & ITaskPersistence): SurveillanceTask | PickupDeliveryTask {
    let raw = task.toObject();
    if (raw.taskType === 'Surveillance') {
      return this.mapSurveillanceTaskToDomain(raw);
    } else if (raw.taskType === 'PickupDelivery') {
      return this.mapPickupDeliveryTaskToDomain(raw);
    }

    throw new Error('Unsupported task type');
  }

  private static mapSurveillanceTaskToDto(surveillanceTask: SurveillanceTask): any {
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

  private static mapSurveillanceTaskToPersistence(surveillanceTask) {
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

  private static mapSurveillanceTaskToDomain(
    raw: any | Model<ITaskPersistence & Document>,
  ): SurveillanceTask {
    const taskOrError = SurveillanceTask.create(raw);
    taskOrError.isFailure ? console.log(taskOrError.error) : '';
    return taskOrError.isSuccess ? taskOrError.getValue() : null;
  }

  private static mapPickupDeliveryTaskToDto(pickupDeliveryTask: PickupDeliveryTask): requestPickupDeliveryTaskDto {
    return {
      taskId: pickupDeliveryTask.taskId,
      user: pickupDeliveryTask.user,
      taskType: pickupDeliveryTask.type.toString(),
      taskStatus: pickupDeliveryTask.status.toString(),
      pickupRoomId: pickupDeliveryTask.pickupRoomId,
      deliveryRoomId: pickupDeliveryTask.deliveryRoomId,
      deliveryConfirmationCode: pickupDeliveryTask.deliveryConfirmationCode,
      description: pickupDeliveryTask.description,
    };
  }
  private static mapPickupDeliveryTaskToPersistence(pickupDeliveryTask) {
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
  private static mapPickupDeliveryTaskToDomain(
    raw: any | Model<ITaskPersistence & Document>,
  ): PickupDeliveryTask {
    const taskOrError = PickupDeliveryTask.create(raw);
    taskOrError.isFailure ? console.log(taskOrError.error) : '';
    return taskOrError.isSuccess ? taskOrError.getValue() : null;
  }
  // Other private mapping methods for different task types...
}
