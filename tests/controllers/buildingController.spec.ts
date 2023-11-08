import 'reflect-metadata';
import {
  mock,
  instance,
  when,
  verify,
  deepEqual,
  anyOfClass,
} from 'ts-mockito';
import { Request, Response, NextFunction } from 'express';
import IBuildingDto, {
  IBuildingCreateRequestDto, IBuildingResponseDto,
  IBuildingUpdateRequestDto
} from "../../src/dto/IBuildingDto";
import IBuildingService from '../../src/services/IServices/IBuildingService';
import BuildingController from '../../src/controllers/buildingController';
import IFloorService from '../../src/services/IServices/IFloorService';
import IPassageService from '../../src/services/IServices/IPassageService';
import { Result } from "../../src/core/logic/Result";

describe('BuildingController', () => {
  let mockedBuildingService: IBuildingService;
  let mockedFloorService: IFloorService;
  let buildingController: BuildingController;
  let mockedReq: Request;
  let mockedRes: Response;
  let mockedNext: NextFunction;

  // beforeEach(() => {
  //   // Mock the dependencies
  //   mockedBuildingService = mock<IBuildingService>();
  //   mockedFloorService = mock<IFloorService>();
  //   mockedReq = mock<Request>();
  //   mockedRes = mock<Response>();
  //   mockedNext = mock<NextFunction>();
  //
  //   // Instantiate the controller with mocked services
  //   buildingController = new BuildingController(
  //     instance(mockedBuildingService),
  //     instance(mockedFloorService),
  //   );
  //
  //   // Set up the mocked response object
  //   when(mockedRes.json(deepEqual({}))).thenReturn(mockedRes);
  //   when(mockedRes.status(200)).thenReturn(mockedRes);
  //   when(mockedRes.status(201)).thenReturn(mockedRes);
  //   when(mockedRes.status(400)).thenReturn(mockedRes);
  //   when(mockedRes.status(404)).thenReturn(mockedRes);
  // });
//
//   describe('createBuilding', () => {
//     it.skip('success - building created', async () => {
//       // Arrange
//       const buildingDto: IBuildingCreateRequestDto = {
//         code: 'B123',
//         name: 'Building 123',
//         length: 100,
//         width: 100,
//       };
//
//       when(mockedReq.body).thenReturn(buildingDto);
//       when(
//         mockedBuildingService.createBuilding(deepEqual(buildingDto)),
//       ).thenResolve();
//
//       // Act
//       await buildingController.createBuilding(
//         instance(mockedReq),
//         instance(mockedRes),
//         instance(mockedNext),
//       );
//
//       // Assert
//       verify(mockedRes.status(201)).once();
//       verify(mockedRes.json(deepEqual(buildingDto))).once();
//     });
//
//     it.skip('fail - invalid data 400', async () => {
//       // Arrange
//       const invalidDto = {
//         length: 100,
//         width: 100,
//       };
//       when(mockedReq.body).thenReturn(invalidDto);
//       when(mockedBuildingService.createBuilding(anyOfClass(Error))).thenReject(
//         new Error('Invalid data'),
//       );
//
//       // Act
//       await buildingController.createBuilding(
//         instance(mockedReq),
//         instance(mockedRes),
//         instance(mockedNext),
//       );
//
//       // Assert
//       verify(mockedRes.status(400)).once();
//       verify(mockedRes.json(deepEqual({ errors: 'Invalid data' }))).once();
//     });
//   });
//
//   describe('updateBuilding', () => {
//     it.skip('success - complete update', async () => {
//       // Arrange
//       const updateDto: IBuildingUpdateRequestDto = {
//         name: 'New Building 123',
//         length: 100,
//         width: 100,
//       };
//       const code = 'B123';
//       when(mockedReq.body).thenReturn(updateDto);
//       when(mockedReq.params).thenReturn({ code });
//       when(
//         mockedBuildingService.updateBuilding(deepEqual(updateDto), code),
//       ).thenResolve(/* your success result here */);
//
//       // Act
//       await buildingController.updateBuilding(
//         instance(mockedReq),
//         instance(mockedRes),
//         instance(mockedNext),
//       );
//
//       // Assert
//       verify(mockedRes.status(200)).once();
//       verify(mockedRes.json(deepEqual(/* your expected DTO here */))).once();
//     });
//
//     it.skip('success - partial update', async () => {
//       // Arrange
//       const partialUpdateDto: Partial<IBuildingUpdateRequestDto> = {
//           name: 'New Building 123',
//           length: 50,
//         };
//         const code = 'B123';
//       when(mockedReq.body).thenReturn(partialUpdateDto);
//       when(mockedReq.params).thenReturn({ code });
//       when(
//         mockedBuildingService.updateBuilding(deepEqual(partialUpdateDto), code),
//       ).thenResolve(/* your success result here */);
//
//       // Act
//       await buildingController.updateBuilding(
//         instance(mockedReq),
//         instance(mockedRes),
//         instance(mockedNext),
//       );
//
//       // Assert
//       verify(mockedRes.status(200)).once();
//       verify(mockedRes.json(deepEqual(/* your expected DTO here */))).once();
//     });
//
//     it.skip('fail - missing id param 404', async () => {
//       // Arrange
//       when(mockedReq.params).thenReturn({});
//
//       // Act
//       await buildingController.updateBuilding(
//         instance(mockedReq),
//         instance(mockedRes),
//         instance(mockedNext),
//       );
//
//       // Assert
//       verify(mockedRes.status(404)).once();
//     });
//
//     it.skip('fail - invalid data 400', async () => {
//       // Arrange
//       const invalidDto = {
//         /* ...invalid data structure... */
//       };
//       const id = 'foobar';
//       when(mockedReq.body).thenReturn(invalidDto);
//       when(mockedReq.params).thenReturn({ id });
//       when(
//         mockedBuildingService.updateBuilding(id, anyOfClass(Error)),
//       ).thenReject(new Error('Invalid data'));
//
//       // Act
//       await buildingController.updateBuilding(
//         instance(mockedReq),
//         instance(mockedRes),
//         instance(mockedNext),
//       );
//
//       // Assert
//       verify(mockedRes.status(400)).once();
//       verify(mockedRes.json(deepEqual({ errors: 'Invalid data' }))).once();
//     });
//   });
//
});
