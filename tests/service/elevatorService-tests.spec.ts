import sinon from "sinon";
import { expect } from "chai";
import  elevatorService  from "../../src/services/elevatorService";
import { RobotType, RobotTypeProps } from "../../src/domain/RobotType";
import BuildingRepo from "../../src/repos/buildingRepo";
import IRobotTypeDto from "../../src/dto/IRobotTypeDTO";
import AlreadyExistsException from "../../src/core/infra/AlreadyExistsException";
import ElevatorRepo from "../../src/repos/elevatorRepo";
import ElevatorService from "../../src/services/elevatorService";
import { IElevatorDto } from "../../src/dto/IElevatorDto";

describe("elevatorService", () => {
  let service: elevatorService;
  let mockElevatorRepo: sinon.SinonStubbedInstance<ElevatorRepo>;
  let mockBuildingRepo: sinon.SinonStubbedInstance<BuildingRepo>;

  beforeEach(() => {
    mockElevatorRepo = sinon.createStubInstance<ElevatorRepo>(ElevatorRepo);
    mockBuildingRepo = sinon.createStubInstance<BuildingRepo>(BuildingRepo);
    service = new ElevatorService(mockElevatorRepo, mockBuildingRepo);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("save", () => {

    it("should return an error for not existent building", async () => {
      mockBuildingRepo.exists.resolves(false);

      const validElevatorDto = {
        buildingId: "building1",
        elevatorId: "elevator1",
        availableFloorNumbers: ["1", "2", "3"],
        serialNumber: "Elevator123",
        description: "Elevator Description",
        model: "Model123",
        brand: "Brand123",
      };

      let elevatorType = validElevatorDto as IElevatorDto;

      let result = await service.save(elevatorType);
      expect(result.errorValue()).to.equal("Building does not exist.");
    });

    it("should return an error for elevator build failure", async () => {
      mockBuildingRepo.exists.resolves(true);
      mockElevatorRepo.countByBuilding.resolves(1);

      const validElevatorDto = {
        buildingId: "building1",
        elevatorId: "elevator1",
        availableFloorNumbers: ["1", "2", "3"],
        serialNumber: "!nv@li&",
        description: "null",
        model: "Model123",
        brand: "Brand123",
      };

      let elevatorType = validElevatorDto as IElevatorDto;

      let result = await service.save(elevatorType);
      console.log(result)
      expect(result.isFailure).to.be.true;
      expect(result.errorValue()).to.equal("Elevator serial number needs to be alphanumeric with no spaces and at maximum 50 characteres long");
    });

  });
});