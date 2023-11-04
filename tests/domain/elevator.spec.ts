import { UniqueEntityID } from "../../src/core/domain/UniqueEntityID";
import { Elevator } from "../../src/domain/elevator/elevator";

const testCases = [
  {
    elevatorData: {
      buildingId: "1",
      elevatorId: "1",
      availableFloorNumbers: ["1", "2", "3"],
      serialNumber: null,
      description: "Elevator Description",
      model: "Model123",
      brand: "Brand123",
      },
    expectedMessage: "ElevatorSerialNumber is null or undefined"
  },
  {
    elevatorData: {
      buildingId: "1",
      elevatorId: "1",
      availableFloorNumbers: ["1", "2", "3"],
      serialNumber: "Valid",
      description: "Elevator Description",
      model: null,
      brand: "Brand123",
      },
    expectedMessage: "ElevatorModel is null or undefined"
  },
  {
    elevatorData: {
      buildingId: "1",
      elevatorId: "1",
      availableFloorNumbers: ["1", "2", "3"],
      serialNumber: "Valid",
      description: "Elevator Description",
      model: "Model123",
      brand: null,
      },
    expectedMessage:"ElevatorBrand is null or undefined"
  },
  {
    elevatorData: {
      buildingId: "1",
      elevatorId: "1",
      availableFloorNumbers: ["1", "2", "3"],
      serialNumber: "A3S b2",
      description: "Elevator Description",
      model: "Model123",
      brand: "Brand123",
      },
    expectedMessage: "Elevator serial number needs to be alphanumeric with no spaces and at maximum 50 characteres long"
  },
  {
    elevatorData: {
      buildingId: "1",
      elevatorId: "1",
      availableFloorNumbers: ["1", "2", "3"],
      serialNumber: "ValidCharsButTooLong".repeat(20),
      description: "Elevator Description",
      model: "Model123",
      brand: "Brand123",
      },
    expectedMessage: "Elevator serial number needs to be alphanumeric with no spaces and at maximum 50 characteres long"
  },
  {
    elevatorData: {
      buildingId: "1",
      elevatorId: "1",
      availableFloorNumbers: ["1", "2", "3"],
      serialNumber: "!nv@l!$",
      description: "Elevator Description",
      model: "Model123",
      brand: "Brand123",
      },
    expectedMessage: "Elevator serial number needs to be alphanumeric with no spaces and at maximum 50 characteres long"
  },
  {
    elevatorData: {
      buildingId: "1",
      elevatorId: "1",
      availableFloorNumbers: ["1", "2", "3"],
      serialNumber: "valid",
      description: "Elevator Description",
      model: "validbuttoolong".repeat(20),
      brand: "Brand123",
      },
    expectedMessage: "Elevator model needs to alphanumeric and at maximum 50 characteres long"
  },
  {
    elevatorData: {
      buildingId: "1",
      elevatorId: "1",
      availableFloorNumbers: ["1", "2", "3"],
      serialNumber: "valid",
      description: "Elevator Description",
      model: "Model123",
      brand: "validbuttoolong".repeat(20),
      },
    expectedMessage: "Elevator brand needs to alphanumeric and at maximum 50 characteres long"
  },
  {
    elevatorData: {
      buildingId: "1",
      elevatorId: "1",
      availableFloorNumbers: ["1", "2", "3"],
      serialNumber: "valid",
      description: "Elevator Description",
      model: "!nv@l!$",
      brand: "Brand123",
      },
    expectedMessage: "Elevator model needs to alphanumeric and at maximum 50 characteres long"
  },
  {
    elevatorData: {
      buildingId: "1",
      elevatorId: "1",
      availableFloorNumbers: ["1", "2", "3"],
      serialNumber: "valid",
      description: "Elevator Description",
      model: "Model123",
      brand: "!nv@l!$",
      },
    expectedMessage: "Elevator brand needs to alphanumeric and at maximum 50 characteres long"
  },
];

describe("Elevator", () => {
  test.each(testCases)("creates an Elevator with invalid data", (data) => {
    const elevatorResult = Elevator.create(data.elevatorData, new UniqueEntityID("test_id"));
    expect(elevatorResult.isSuccess).toBe(false);
    expect(elevatorResult.errorValue()).toBe(data.expectedMessage);
  });
});