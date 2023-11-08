import { RobotType, RobotTypeProps } from '../../src/domain/robotType/RobotType';
import { Robot } from '../../src/domain/robot/robot';
import { RobotTypeMap } from '../../src/mappers/RobotTypeMap';

const validProps: RobotTypeProps = {
  brand: 'brand',
  model: 'Model',
  robotType: 'Type1',
  taskTypes: ['Surveillance', 'PickupAndDelivery'],
};

const robotTypeDto = RobotTypeMap.toDTO(RobotType.create(validProps).getValue());

const testCases = [
  {
    robotData: {
    nickname: null,
    designation: 'Designation1',
    state: true,
    serialNumber: "serialnumber3",
    robotType: robotTypeDto,
    },
    expectedMessage: "nickname is null or undefined"
  },
  {
    robotData: {
    nickname: "invalid".repeat(20),
    designation: 'Designation1',
    state: true,
    serialNumber: "serialnumber3",
    robotType: robotTypeDto,
    },
    expectedMessage: "Robot nickname needs to alphanumeric and at maximum 30 characteres long"
  },
  {
    robotData: {
      nickname: 'RoB@$',
      designation: 'designation',
      state: false,
      serialNumber: "serialnumber3",
      robotType: robotTypeDto,
    },
    expectedMessage: "Robot nickname needs to alphanumeric and at maximum 30 characteres long"
  },
  {
    robotData: {
    nickname: "nickname",
    designation: null,
    state: true,
    serialNumber: "serialnumber3",
    robotType: robotTypeDto,
    },
    expectedMessage: "robotdesignation is null or undefined"
  },
  {
    robotData: {
    nickname: "valid",
    designation: 'Designation1'.repeat(50),
    state: true,
    serialNumber: "serialnumber3",
    robotType: robotTypeDto,
    },
    expectedMessage: "Robot designation needs to alphanumeric and at maximum 250 characteres long"
  },
  {
    robotData: {
      nickname: 'valid',
      designation: 'd#&/',
      state: false,
      serialNumber: "serialnumber3",
      robotType: robotTypeDto,
    },
    expectedMessage: "Robot designation needs to alphanumeric and at maximum 250 characteres long"
  },
  {
    robotData: {
    nickname: "nickname",
    designation: "designation",
    state: null,
    serialNumber: "serialnumber3",
    robotType: robotTypeDto,
    },
    expectedMessage: "robotstate is null or undefined"
  },
  {
    robotData: {
    nickname: "nickname",
    designation: "designation",
    state: true,
    serialNumber: null,
    robotType: robotTypeDto,
    },
    expectedMessage: "robotserialNumber is null or undefined"
  },
  {
    robotData: {
    nickname: "valid",
    designation: 'Designation1',
    state: true,
    serialNumber: "serialnumber3".repeat(20),
    robotType: robotTypeDto,
    },
    expectedMessage: "Robot serial number needs to alphanumeric and at maximum 50 characteres long"
  },
  {
    robotData: {
      nickname: 'valid',
      designation: 'designation',
      state: false,
      serialNumber: "serialnumber3!",
      robotType: robotTypeDto,
    },
    expectedMessage: "Robot serial number needs to alphanumeric and at maximum 50 characteres long"
  },
]

describe('RobotType', () => {

  test.each(testCases)('creates a Robot with invalid data', async (data) => {
    const result = Robot.create(data.robotData);
    expect(result.isSuccess).toBe(false);
    expect(result.errorValue()).toBe(data.expectedMessage);
  });
});
