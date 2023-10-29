import { log } from 'console';
import { Building } from '../../src/domain/building/Building';

const testCases = [
  {
    buildingData: {
      code: null,
      name: 'Designation1',
      length: 10,
      width: 20,
    },
    title: 'Building code is null or undefined',
    expectedMessage: 'code is null or undefined',
  },
  {
    buildingData: {
      code: 'morethan5caracters',
      name: 'Designation1',
      length: 10,
      width: 20,
    },
    title: 'Building code has more than 5 caracters',
    expectedMessage:
      'Building code is mandatory and has a maximum of 5 chars (leters, numbers and space).',
  },
  {
    buildingData: {
      code: '#',
      name: 'Designation1',
      length: 10,
      width: 20,
    },
    title: 'Building code has iligal caracters',
    expectedMessage:
      'Building code is mandatory and has a maximum of 5 chars (leters, numbers and space).',
  },
  {
    buildingData: {
      code: 'V 1',
      name: '1'.repeat(256),
      length: 10,
      width: 20,
    },
    title: 'Building name has more than 255 caracters',
    expectedMessage:
      'Building name has maximum of 255 chars.',
  },
  {
    buildingData: {
      code: 'V 1',
      name: 'Designation1',
      length: 0,
      width: 20,
    },
    title: 'Building length is 0',
    expectedMessage: 'Building length must be a Integer and greater than 0.',
  },
  {
    buildingData: {
      code: 'V 1',
      name: 'Designation1',
      length: -5,
      width: 20,
    },
    title: 'Building length is negative',
    expectedMessage: 'Building length must be a Integer and greater than 0.',
  },
  {
    buildingData: {
      code: 'V 1',
      name: 'Designation1',
      length: 10,
      width: 0,
    },
    title: 'Building width is 0',
    expectedMessage: 'Building width must be a Integer and greater than 0.',
  },
  {
    buildingData: {
      code: 'V 1',
      name: 'Designation1',
      length: 10,
      width: -10,
    },
    title: 'Building width is negative',
    expectedMessage: 'Building width must be a Integer and greater than 0.',
  },
];

describe('Building', () => {
  test.each(testCases)('building', async data => {
    console.log(data.title);
    const result = Building.create(data.buildingData);
    expect(result.isSuccess).toBe(false);
    expect(result.errorValue()).toBe(data.expectedMessage);
  });
});
