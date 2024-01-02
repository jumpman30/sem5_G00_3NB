import { Result } from '../../core/logic/Result';
import { Guard } from '../../core/logic/Guard';
import { Task } from './Task';
import { TaskId } from './TaskId';
import { TaskProps } from './Task';

interface DeliveryTaskProps extends TaskProps {
  pickupRoomId: string;
  deliveryRoomId: string;
  deliveryConfirmationCode: number;
  description: string;
}
export class PickupDeliveryTask extends Task {
  private pickupDeliveryProps: Omit<DeliveryTaskProps, keyof TaskProps>;

  get pickupRoomId(): string {
    return this.pickupDeliveryProps.pickupRoomId;
  }

  get deliveryRoomId(): string {
    return this.pickupDeliveryProps.deliveryRoomId;
  }

  get deliveryConfirmationCode(): number {
    return this.pickupDeliveryProps.deliveryConfirmationCode;
  }

  get description(): string {
    return this.pickupDeliveryProps.description;
  }

  private constructor(props: DeliveryTaskProps, id: TaskId) {
    super(props, id);
    this.pickupDeliveryProps = {
      pickupRoomId: props.pickupRoomId,
      deliveryRoomId: props.deliveryRoomId,
      deliveryConfirmationCode: props.deliveryConfirmationCode,
      description: props.description,
    };
  }

  public static create(props: DeliveryTaskProps): Result<PickupDeliveryTask> {
    const guardedProps = [
      { argument: props.pickupRoomId, argumentName: 'pickupRoomId' },
      { argument: props.deliveryRoomId, argumentName: 'deliveryRoomId' },
      {
        argument: props.deliveryConfirmationCode,
        argumentName: 'deliveryConfirmationCode',
      },
      { argument: props.description, argumentName: 'description' },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<PickupDeliveryTask>(guardResult.message);
    } else {
      const uniqueId = TaskId.create();
      const task = new PickupDeliveryTask(props, uniqueId);

      return Result.ok<PickupDeliveryTask>(task);
    }
  }
}
