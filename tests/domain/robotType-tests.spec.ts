import { RobotType, RobotTypeProps } from '../../src/domain/robotType/RobotType';

describe('RobotType', () => {
  it('should create a valid RobotType', () => {

    const validProps: RobotTypeProps = {
      brand: 'Brand',
      model: 'Model',
      robotType: 'Type1',
      taskTypes: ['Surveillance', 'PickupAndDelivery'],
    };

    const result = RobotType.create(validProps);

    expect(result.isSuccess).toBe(true);
    expect(result.getValue()).toBeInstanceOf(RobotType);
  });

  it('RobotType with invalid brand should fail', () => {

    const validProps: RobotTypeProps = {
      brand: 'Brand'.repeat(20),
      model: 'Model',
      robotType: 'Type1',
      taskTypes: ['Surveillance', 'PickupAndDelivery'],
    };

    const result = RobotType.create(validProps);

    expect(result.isSuccess).toBe(false);
    expect(result.errorValue()).toBe("Robot brand and model should have at max 50 and 100 characteres respectively.");
  });

  it('should return an error when creating a RobotType with no brand', () => {
    const invalidProps: RobotTypeProps = {
      brand: '',
      model: 'Model',
      robotType: 'Type1',
      taskTypes: ['Surveillance', 'PickupAndDelivery'],
    };

    const result = RobotType.create(invalidProps);

    expect(result.isSuccess).toBe(false);
    expect(result.errorValue()).toBe('brand is null or undefined or empty');
  });

  it('should return an error when creating a RobotType with no model', () => {
    const invalidProps: RobotTypeProps = {
      brand: 'Brand',
      model: '',
      robotType: 'Type1',
      taskTypes: ['Surveillance', 'PickupAndDelivery'],
    };

    const result = RobotType.create(invalidProps);

    expect(result.isSuccess).toBe(false);
    expect(result.errorValue()).toBe('model is null or undefined or empty');
  });

  it('should return an error when creating a RobotType with invalid taskTypes', () => {
    const invalidProps: RobotTypeProps = {
      brand: 'Brand',
      model: 'Model',
      robotType: 'Type1',
      taskTypes: ['InvalidTaskType'],
    };

    const result = RobotType.create(invalidProps);

    expect(result.isSuccess).toBe(false);
    expect(result.errorValue()).toBe(
      'Robot type InvalidTaskType is not recognized as a valid task type, please add a PickupAndDelivery and/or a Surveillance type.'
    );
  });

  it('should return an error when creating a RobotType with a non-alphanumeric robotType', () => {
    const invalidProps: RobotTypeProps = {
      brand: 'Brand',
      model: 'Model',
      robotType: 'Invalid$Type',
      taskTypes: ['Surveillance', 'PickupAndDelivery'],
    };

    const result = RobotType.create(invalidProps);

    expect(result.isSuccess).toBe(false);
    expect(result.errorValue()).toBe(
      'Robot type should have at max 25 characteres.(alphanumeric only)'
    );
  });

  it('should return an error when creating a RobotType with brand and model exceeding character limits', () => {
    const invalidProps: RobotTypeProps = {
      brand: 'Brand'.repeat(20),
      model: 'Model'.repeat(20),
      robotType: 'Type1',
      taskTypes: ['Surveillance', 'PickupAndDelivery'],
    };

    const result = RobotType.create(invalidProps);

    expect(result.isSuccess).toBe(false);
    expect(result.errorValue()).toBe(
      'Robot brand and model should have at max 50 and 100 characteres respectively.'
    );
  });
});
