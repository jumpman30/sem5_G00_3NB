import sinon from 'sinon';
import { expect } from 'chai';
import { Request, Response, NextFunction } from 'express';
import  robotTypeService  from '../../src/services/robotTypeService';
import  RobotTypeController  from '../../src/controllers/robotTypeController';
import { RobotType, RobotTypeProps } from '../../src/domain/RobotType';
import IRobotTypeDto from '../../src/dto/IRobotTypeDTO';
import AlreadyExistsException from '../../src/core/infra/AlreadyExistsException';
import { Result } from '../../src/core/logic/Result';
import { RobotTypeMap } from '../../src/mappers/RobotTypeMap';

describe('robotTypeController', () => {
  let mockRobotTypeService: sinon.SinonStubbedInstance<robotTypeService>;
  let robotTypeController: RobotTypeController;

  beforeEach(() => {
    mockRobotTypeService = sinon.createStubInstance<robotTypeService>(robotTypeService);
    robotTypeController = new RobotTypeController(mockRobotTypeService);
  });

  afterEach(() => {
    sinon.restore();
  });

  const res = {
    status: () => {
      return {
        send: () => {}
      }
    },
    json: (arg) =>  res
  } as  unknown as Response<any, Record<string, any>>;
  
  describe('createRobotType', () => {

    it('should return an status 422 for robot type creation failure', async () => {
      mockRobotTypeService.createRobotType.resolves(Result.fail<IRobotTypeDto>("failed to create robot"))

      const invalidProps: RobotTypeProps = {
        brand: '',
        model: 'Model',
        robotType: 'Type1',
        taskTypes: ['Surveillance', 'PickupAndDelivery'],
      };
      let req = {body: invalidProps} as unknown as Request<any, any, any, any, Record<string, any>>;
      let next = jest.fn() as NextFunction;

      let resSpy = sinon.spy(res, 'status')

      await robotTypeController.createRobotType(req, res, next);

      expect(resSpy.called).to.be.true
      expect(resSpy.calledWith(422)).to.be.true
    }); 

    it('should return an status 409 for already existent robotType', async () => {
      mockRobotTypeService.createRobotType.throws(new AlreadyExistsException("User already exists"))

      const invalidProps: RobotTypeProps = {
        brand: 'brand',
        model: 'Model',
        robotType: 'Type1',
        taskTypes: ['Surveillance', 'PickupAndDelivery'],
      };
      let req = {body: invalidProps} as unknown as Request<any, any, any, any, Record<string, any>>;
      let next = jest.fn() as NextFunction;

      let resSpy = sinon.spy(res, 'status')
      await robotTypeController.createRobotType(req, res, next);
      expect(resSpy.called).to.be.true
      expect(resSpy.calledWith(409)).to.be.true
    }); 
    
    it('should return an robot type for successful robot creation', async () => {
      const validProps: RobotTypeProps = {
        brand: 'brand',
        model: 'Model',
        robotType: 'Type1',
        taskTypes: ['Surveillance', 'PickupAndDelivery'],
      };

      let robotTypeExpected = RobotTypeMap.toDTO(RobotType.create(validProps).getValue());

      mockRobotTypeService.createRobotType.resolves(Result.ok<IRobotTypeDto>(robotTypeExpected))

      let req = {body: validProps} as unknown as Request<any, any, any, any, Record<string, any>>;
      let next = jest.fn() as NextFunction;

      let resStatusSpy = sinon.spy(res, 'status')
      let resJsonSpy = sinon.spy(res, 'json')

      await robotTypeController.createRobotType(req, res, next);
      
      expect(resStatusSpy.calledWith(201)).to.be.true
      expect(resJsonSpy.calledWith(robotTypeExpected)).to.be.true
    }); 
  });
});