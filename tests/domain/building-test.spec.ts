import { BuildingId } from "../../src/domain/building/buildingId";
import { Building } from "../../src/domain/building/building";

describe("Building", () => {
  const buildingProps = {
    domainId: "B1",
    designation: "Main Building",
    length: "120",
    width: "80"
  };
  const buildingId = BuildingId.create(buildingProps.domainId);

  it("should be able to create a building object with valid properties", () => {
    const buildingResult = Building.create(buildingProps);

    expect(buildingResult.isSuccess).toBe(true);
    expect(buildingResult.getValue()).toBeInstanceOf(Building);
  });

  it("should fail to create a building with undefined width", () => {
    const invalidProps = { ...buildingProps, width: undefined };
    const buildingResult = Building.create(invalidProps);

    expect(buildingResult.isFailure).toBe(true);
  });

  it("should fail to create a building with undefined length", () => {
    const invalidProps = { ...buildingProps, length: undefined };
    const buildingResult = Building.create(invalidProps);

    expect(buildingResult.isFailure).toBe(true);
  });

  describe("when a valid Building is created", () => {
    const building = Building.create(buildingProps).getValue();

    it("should have the correct width", () => {
      expect(building.width).toBe(buildingProps.width);
    });

    it("should have the correct length", () => {
      expect(building.length).toBe(buildingProps.length);
    });

    it("should have the correct domainId", () => {
      expect(building.domainId).toBe(buildingProps.domainId);
    });

    it("should have the correct designation", () => {
      expect(building.designation).toBe(buildingProps.designation);
    });

    it("should have an id", () => {
      expect(building.id).toStrictEqual(buildingId);
    });
  });
});
