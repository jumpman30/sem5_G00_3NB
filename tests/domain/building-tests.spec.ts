import { Building } from '../../src/domain/building/Building';

describe('Building Validation', () => {
  const testCases = [
    {
      buildingData: { code: null, name: 'Designation1', length: 10, width: 20 },
      title: 'should reject when building code is null or undefined',
      expected: { isSuccess: false, message: 'code is null or undefined' },
    },
    {
      buildingData: { code: 'morethan5caracters', name: 'Designation1', length: 10, width: 20 },
      title: 'should reject when building code has more than 5 characters',
      expected: { isSuccess: false, message: 'Building code is mandatory and has a maximum of 5 chars (letters, numbers and space).' },
    },
    {
      buildingData: { code: '#', name: 'Designation1', length: 10, width: 20 },
      title: 'should reject when building code has illegal characters',
      expected: { isSuccess: false, message: 'Building code is mandatory and has a maximum of 5 chars (letters, numbers and space).' },
    },
    {
      buildingData: { code: 'V 1', name: '1'.repeat(256), length: 10, width: 20 },
      title: 'should reject when building name has more than 255 characters',
      expected: { isSuccess: false, message: 'Building name has maximum of 255 chars.' },
    },
    {
      buildingData: { code: 'V 1', name: 'Designation1', length: 0, width: 20 },
      title: 'should reject when building length is 0',
      expected: { isSuccess: false, message: 'Building length must be an Integer and greater than 0.' },
    },
    {
      buildingData: { code: 'V 1', name: 'Designation1', length: -5, width: 20 },
      title: 'should reject when building length is negative',
      expected: { isSuccess: false, message: 'Building length must be an Integer and greater than 0.' },
    },
    {
      buildingData: { code: 'V 1', name: 'Designation1', length: 10, width: 0 },
      title: 'should reject when building width is 0',
      expected: { isSuccess: false, message: 'Building width must be an Integer and greater than 0.' },
    },
    {
      buildingData: { code: 'V 1', name: 'Designation1', length: 10, width: 10.5 },
      title: 'should reject when building width is not integer',
      expected: { isSuccess: false, message: 'Building width must be an Integer and greater than 0.' },
    },
    {
      buildingData: { code: 'V 1', name: 'Designation1', length: 10, width: -10 },
      title: 'should reject when building width is negative',
      expected: { isSuccess: false, message: 'Building width must be an Integer and greater than 0.' },
    },
    {
      buildingData: { code: 'V 1', name: 'Designation1', length: 10.5, width: 10 },
      title: 'should reject when building length is not integer',
      expected: { isSuccess: false, message: 'Building length must be an Integer and greater than 0.' },
    },
  ];

  testCases.forEach(({ buildingData, title, expected }) => {
    it(title, () => {
      const result = Building.create(buildingData);
      expect(result.isSuccess).toBe(expected.isSuccess);
      expect(result.errorValue()).toBe(expected.message);
    });
  });
});
