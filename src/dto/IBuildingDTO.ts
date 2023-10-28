import { BuildingCode } from '../domain/BuildingCode';

export default interface IBuildingDto {
  domainId: string;
  code: BuildingCode;
  name: string;
  length: number;
  width: number;
  createdAt?: string;
  updatedAt?: string;
}

export type ICreateBuildingDto = Omit<IBuildingDto, 'createdAt' | 'updatedAt'>;
export type IUpdateBuildingDto = Partial<
  Omit<IBuildingDto, 'createdAt' | 'updatedAt' | 'domainId'>
>;
export type IGetBuildingDto = Omit<IBuildingDto, 'createdAt' | 'updatedAt'>;
