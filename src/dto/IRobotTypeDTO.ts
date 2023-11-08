import { TaskTypes } from "../domain/robotType/TaskTypes";

export default interface IRobotTypeDto {
  id: string;
  brand: string;
  model: string;
  robotType: string;
  taskTypes: string [];
}
