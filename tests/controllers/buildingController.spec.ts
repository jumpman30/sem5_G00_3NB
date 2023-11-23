import 'reflect-metadata';
import {
  mock,
  instance,
  when,
  verify,
  deepEqual,
  anyOfClass,
  anything,
} from 'ts-mockito';
import { Request, Response, NextFunction } from 'express';
import IBuildingService from '../../src/services/IServices/IBuildingService';
import BuildingController from '../../src/controllers/buildingController';
import IFloorService from '../../src/services/IServices/IFloorService';
import { IBuildingDto } from "../../src/dto/IBuildingDto";
import { IBuildingUpdateDto } from "../../src/dto/IBuidlingUpdateDto";
import { Result } from "../../src/core/logic/Result";
import { result } from "lodash";
describe('BuildingController', () => {
  let mockedBuildingService: IBuildingService;
  let mockedFloorService: IFloorService;
  let buildingController: BuildingController;
  let mockedReq: Request;
  let mockedRes: Response;
  let mockedNext: NextFunction;

  beforeEach(() => {
    // Mock the dependencies
    mockedBuildingService = mock<IBuildingService>();
    mockedFloorService = mock<IFloorService>();
    mockedReq = mock<Request>();
    mockedRes = mock<Response>();
    mockedNext = mock<NextFunction>();

    // Instantiate the controller with mocked services
    buildingController = new BuildingController(
      instance(mockedBuildingService),
      instance(mockedFloorService),
    );

    // Set up the mocked response object
    when(mockedRes.json(deepEqual({}))).thenReturn(mockedRes);
    when(mockedRes.status(200)).thenReturn(mockedRes);
    when(mockedRes.status(201)).thenReturn(mockedRes);
    when(mockedRes.status(400)).thenReturn(mockedRes);
    when(mockedRes.status(404)).thenReturn(mockedRes);
  });

  describe('createBuilding', () => {
    it('success - building created', async () => {
      // Arrange
      const buildingDto: IBuildingDto = {
        buildingId: 'B123',
        designation: 'Building 123',
        length: '100',
        width: '100',
      };

      when(mockedReq.body).thenReturn(buildingDto);
      when(
        mockedBuildingService.save(deepEqual(buildingDto)),
      ).thenResolve(Result.ok({ buildingId: 'B123' }));

      // Act
      await buildingController.createBuilding(
        instance(mockedReq),
        instance(mockedRes),
        instance(mockedNext),
      );

      // Assert
      verify(mockedRes.json(deepEqual(buildingDto)));
    });
  });

  describe('updateBuilding', () => {
    it('success - complete update', async () => {
      // Arrange
      const updateDto: IBuildingUpdateDto = {
                                              buildingId: 'B123',
                                              designation: 'New Building 123',
                                              length: '100',
                                              width: '100',
                                            };
      const code = 'B123';
      when(mockedReq.body).thenReturn(updateDto);
      when(mockedReq.params).thenReturn({ code });
      when(
        mockedBuildingService.update(deepEqual(updateDto)),
      ).thenResolve(Result.ok({
                                      buildingId: 'B123',
                                      designation: 'New Building 123',
                                      length: '100',
                                      width: '100',
                                    })
      );

      // Act
      await buildingController.updateBuilding(
        instance(mockedReq),
        instance(mockedRes),
        instance(mockedNext),
      );

      // Assert
      verify(mockedRes.status(200)).once();
      verify(mockedRes.json(deepEqual({
                                        buildingId: 'B123',
                                        designation: 'New Building 123',
                                        length: '100',
                                        width: '100',
                                      })));
    });

    it('success - partial update', async () => {
      // Arrange
      const partialUpdateDto: IBuildingUpdateDto = {
          buildingId: 'B123',
          designation: 'New Building 123',
          length: '50',
        };
        const code = 'B123';
      when(mockedReq.body).thenReturn(partialUpdateDto);
      when(mockedReq.params).thenReturn({ code });
      when(
        mockedBuildingService.update(deepEqual(partialUpdateDto)),
      ).thenResolve(Result.ok({ buildingId: 'B123',
                                      designation: 'New Building 123',
                                      length: '50',
                                      width: '100',}
                                  ));
      // Act
      await buildingController.updateBuilding(
        instance(mockedReq),
        instance(mockedRes),
        instance(mockedNext),
      );

      // Assert
      verify(mockedRes.status(200)).once();
      verify(mockedRes.json(deepEqual({
                                        buildingId: 'B123',
                                        designation: 'New Building 123',
                                        width: '100',
                                        length: '50',
                                      })));
    });

  });
});
