import { Result } from '../../core/logic/Result';
import { Guard } from '../../core/logic/Guard';
import { Task } from './Task';
import { TaskId } from './TaskId';
import { TaskProps } from './Task';

interface SurveillanceTaskProps extends TaskProps {
  buildingId: string;
  floorId: string;
  emergencyContact: string;
}
export class SurveillanceTask extends Task {
  private surveillanceProps: Omit<SurveillanceTaskProps, keyof TaskProps>;

  get buildingId(): string {
    return this.surveillanceProps.buildingId;
  }

  get floorId(): string {
    return this.surveillanceProps.floorId;
  }

  get emergencyContact(): string {
    return this.surveillanceProps.emergencyContact;
  }


  private constructor(props: SurveillanceTaskProps, id: TaskId) {
    super(props, id);
    this.surveillanceProps = {
      buildingId: props.buildingId,
      floorId: props.floorId,
      emergencyContact: props.emergencyContact,
    };
  }

  public static create(props: SurveillanceTaskProps): Result<SurveillanceTask> {
    const guardedProps = [
      { argument: props.buildingId, argumentName: 'buildingId' },
      { argument: props.floorId, argumentName: 'floorId' },
      { argument: props.emergencyContact, argumentName: 'emergencyContact' },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<SurveillanceTask>(guardResult.message);
    } else {
      const uniqueId = TaskId.create(props.taskId);
      const task = new SurveillanceTask(props, uniqueId);

      return Result.ok<SurveillanceTask>(task);
    }
  }
}
