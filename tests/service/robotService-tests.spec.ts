import sinon from 'sinon';
import { expect } from 'chai';
import  RobotService  from '../../src/services/robotService';
import { RobotType, RobotTypeProps } from '../../src/domain/RobotType';
import AlreadyExistsException from '../../src/core/infra/AlreadyExistsException';
import { IRobotDTO } from '../../src/dto/IRobotDTO';
import RobotRepo from '../../src/repos/robotRepo';
import RobotTypeRepo from '../../src/repos/robotTypeRepo';
import { ICreateRobotRequestDto } from '../../src/dto/ICreateRobotRequestDto';

describe('robotTypeService', () => {
  let service: RobotService;
  let mockRobotRepo: sinon.SinonStubbedInstance<RobotRepo>;
  let mockRobotTypeRepo: sinon.SinonStubbedInstance<RobotTypeRepo>;

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
  
  
  beforeEach(() => {
    mockRobotRepo = sinon.createStubInstance<RobotRepo>(RobotRepo);
    mockRobotTypeRepo = sinon.createStubInstance<RobotTypeRepo>(RobotTypeRepo);
    service = new RobotService(mockRobotRepo, mockRobotTypeRepo);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('createRobot', () => {
    it('should return an error for non existent robotType', async () => {
      mockRobotTypeRepo.findByRobotType.resolves(undefined);

      let createRequestDto = {...robotData, robotType: robotData.robotType.id.toValue()} as ICreateRobotRequestDto

      let result = await service.createRobot(createRequestDto); 

      expect(result.isFailure).to.be.true
      expect(result.errorValue()).to.be.equal("Robot type not found.")
    });
  });
});