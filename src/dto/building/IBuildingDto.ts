import { BuildingCode } from '../../domain/building/BuildingCode';

export default interface IBuildingDto {
  domainId: string;
  code: string;
  name: string;
  length: number;
  width: number;
}
