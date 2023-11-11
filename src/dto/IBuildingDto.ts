export default interface IBuildingDto {
    code: string;
    name: string;
    length: number;
    width: number;
}

export type IBuildingCreateRequestDto = IBuildingDto;
export type IBuildingUpdateRequestDto = Partial<Omit<IBuildingDto, 'code'>>;
export type IBuildingResponseDto = IBuildingDto;
