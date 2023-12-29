import sinon from 'sinon';
import { expect } from 'chai';
import { Request, Response, NextFunction } from 'express';
import  robotTypeService  from '../../src/services/robotTypeService';
import  RobotController  from '../../src/controllers/robotController';
import { RobotType, RobotTypeProps } from '../../src/domain/robotType/RobotType';
import IRobotTypeDto from '../../src/dto/IRobotTypeDTO';
import AlreadyExistsException from '../../src/core/infra/AlreadyExistsException';
import { Result } from '../../src/core/logic/Result';
import { RobotTypeMap } from '../../src/mappers/RobotTypeMap';
import RobotService from '../../src/services/robotService';
import { ICreateRobotResponseDto } from '../../src/dto/ICreateRobotResponseDto';
import { IRobotDTO } from '../../src/dto/IRobotDTO';
import { RobotProps } from '../../src/domain/robot/robot';
import { ICreateRobotRequestDto } from '../../src/dto/ICreateRobotRequestDto';

describe('robotController', () => {
  let mockRobotService: sinon.SinonStubbedInstance<RobotService>;
  let robotController: RobotController;

  beforeEach(() => {
    mockRobotService = sinon.createStubInstance<RobotService>(RobotService);
    robotController = new RobotController(mockRobotService);
  });

  afterEach(() => {
    sinon.restore();
  });

  const validProps: RobotTypeProps = {
    brand: 'brand',
    model: 'Model',
    robotType: 'Type1',
    taskTypes: ['Surveillance', 'PickupAndDelivery'],
  };
  let robotType = RobotType.create(validProps).getValue();

  const robotData =  {
    nickname: "nickname",
    designation: 'Designation1',
    state: true,
    serialNumber: "serialnumber3",
    robotType: robotType,
  } as IRobotDTO;

  const res = {
    status: () => {
      return {
        send: () => {}
      }
    },
    json: (arg) =>  res
  } as  unknown as Response<any, Record<string, any>>;

  describe('createRobot', () => {

    it('should return an status 422 for robot type creation failure', async () => {
      mockRobotService.createRobot.resolves(Result.fail<ICreateRobotResponseDto>("failed to create robot"))

      const robotData =  {
        nickname: "nickname",
        designation: 'Designation1',
        state: true,
        serialNumber: "serialnumber3",
        robotType: robotType.id.toValue(),
      } as ICreateRobotRequestDto;

      let req = {body: robotData} as unknown as Request<any, any, any, any, Record<string, any>>;
      let next = jest.fn() as NextFunction;

      let resSpy = sinon.spy(res, 'status')

      await robotController.createRobot(req, res, next);

      expect(resSpy.called).to.be.true
      expect(resSpy.calledWith(422)).to.be.true
    });

    it('should return an robot for successful robot creation', async () => {

      let robotTypeExpected = {...robotData, robotType: RobotTypeMap.toDTO(robotData.robotType)};

      mockRobotService.createRobot.resolves(Result.ok<ICreateRobotResponseDto>(robotTypeExpected))

      let req = {body: validProps} as unknown as Request<any, any, any, any, Record<string, any>>;
      let next = jest.fn() as NextFunction;

      let resStatusSpy = sinon.spy(res, 'status')
      let resJsonSpy = sinon.spy(res, 'json')

      await robotController.createRobot(req, res, next);

      expect(resStatusSpy.calledWith(201)).to.be.true
      expect(resJsonSpy.calledWith(robotTypeExpected)).to.be.true
    });
  });

  describe('inhibtRobot', () => {

    it('should return an status 404 for non existing robot', async () => {
      mockRobotService.inhibtRobot.resolves(Result.fail<IRobotDTO>("Robot type not found."));

      let req = {params: {nickname: "robotA"}} as unknown as Request<any, any, any, any, Record<string, any>>;
      let next = jest.fn() as NextFunction;

      let resSpy = sinon.spy(res, 'status')

      await robotController.inhibtRobot(req, res, next);

      expect(resSpy.called).to.be.true
      expect(resSpy.calledWith(404)).to.be.true
    });

    it('should return an status 204 no content for patched robots', async () => {
      mockRobotService.inhibtRobot.resolves(Result.ok<IRobotDTO>());

      let req = {params: {nickname: "robotA"}} as unknown as Request<any, any, any, any, Record<string, any>>;
      let next = jest.fn() as NextFunction;

      let resSpy = sinon.spy(res, 'status')

      await robotController.inhibtRobot(req, res, next);

      expect(resSpy.called).to.be.true
      expect(resSpy.calledWith(204)).to.be.true
    });
  });
});
