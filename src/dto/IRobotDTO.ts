import { RobotType } from "../domain/robotType/RobotType";

export interface IRobotDTO {
  nickname: string;
  designation: string;
  state: boolean;
  serialNumber: string;
  robotType: RobotType;
}
