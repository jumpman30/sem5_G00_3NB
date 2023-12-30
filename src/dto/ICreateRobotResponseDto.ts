import IRobotTypeDTO from "./IRobotTypeDTO";

export interface ICreateRobotResponseDto {
  nickname: string;
  designation: string;
  state: boolean;
  serialNumber: string;
  robotType: IRobotTypeDTO;
}
