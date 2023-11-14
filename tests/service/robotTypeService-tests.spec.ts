import sinon from 'sinon';
import { expect } from 'chai';
import  robotTypeService  from '../../src/services/robotTypeService';
import { RobotType, RobotTypeProps } from '../../src/domain/RobotType';
import RobotTypeRepo from '../../src/repos/robotTypeRepo';
import IRobotTypeDto from '../../src/dto/IRobotTypeDTO';
import AlreadyExistsException from '../../src/core/infra/AlreadyExistsException';

describe('robotTypeService', () => {
  let service: robotTypeService;
  let mockRobotTypeRepo: sinon.SinonStubbedInstance<RobotTypeRepo>;

  beforeEach(() => {
    mockRobotTypeRepo = sinon.createStubInstance<RobotTypeRepo>(RobotTypeRepo);
    service = new robotTypeService(mockRobotTypeRepo);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('save', () => {

    it('should return an error for invalid brand', async () => {
      const invalidProps: RobotTypeProps = {
        brand: '',
        model: 'Model',
        robotType: 'Type1',
        taskTypes: ['Surveillance', 'PickupAndDelivery'],
      };

      let robotType = invalidProps as IRobotTypeDto;

      let result = await service.createRobotType(robotType);
      expect(result.errorValue()).to.equal('brand is null or undefined or empty');
    });

    it('should return an error for invalid model', async () => {
      const invalidProps: RobotTypeProps = {
        brand: 'Brand',
        model: '',
        robotType: 'Type1',
        taskTypes: ['Surveillance', 'PickupAndDelivery'],
      };

      let robotType = invalidProps as IRobotTypeDto;

      let result = await service.createRobotType(robotType);
      expect(result.errorValue()).to.equal('model is null or undefined or empty');
    });

    it('should return an error for existent robotType', async () => {
      mockRobotTypeRepo.exists.resolves(true);

      const invalidProps: RobotTypeProps = {
        brand: 'Brand',
        model: 'Model',
        robotType: 'Type1',
        taskTypes: ['Surveillance', 'PickupAndDelivery'],
      };

      let robotType = invalidProps as IRobotTypeDto;

      try{
        await service.createRobotType(robotType); 
      }
      catch(e){
        expect(e instanceof AlreadyExistsException).to.be.true;
        expect(e.message).to.equal("User already exists")
      }
    });

    it('should return an created robotType for valid robotType', async () => {
      mockRobotTypeRepo.exists.resolves(false);
      const validProps: RobotTypeProps = {
        brand: 'Brand',
        model: 'Model',
        robotType: 'Type1',
        taskTypes: ['Surveillance', 'PickupAndDelivery'],
      };

      mockRobotTypeRepo.save.resolves(RobotType.create(validProps).getValue())

      let robotType = validProps as IRobotTypeDto;

      let result = await service.createRobotType(robotType); 

      expect(result.getValue().robotType).to.equal(robotType.robotType);
    });
  });
});