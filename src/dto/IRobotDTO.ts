import { RobotType } from "../domain/RobotType";

export interface IRobotDTO {
  nickname: string;
  designation: string;
  state: boolean;
  serialNumber: number;
  robotType: RobotType;
}

