import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Document, Model } from 'mongoose';
import { Container } from 'typedi';
import IBuildingService from '../../src/services/IServices/IBuildingService';
import IBuildingRepo from '../../src/services/IRepos/IBuildingRepo';
import BuildingRepo from '../../src/repos/buildingRepo';
import { IBuildingPersistence } from '../../src/dataschema/IBuildingPersistence';
import IBuildingController from '../../src/controllers/IControllers/IBuildingController';

describe('building controller', function() {
  const sandbox = sinon.createSandbox();
  let buildingSchemaInstance: Model<IBuildingPersistence & Document>;
  let buildingRepoInstance: IBuildingRepo;
  let buildingServiceInstance: IBuildingService;
  let buildingControllerInstance: IBuildingController;

  beforeEach(function(done) {
    Container.reset();

    buildingSchemaInstance = require('../src/persistence/schemas/buildingSchema').default;
    Container.set('buildingSchema', buildingSchemaInstance);

    buildingRepoInstance = new BuildingRepo(buildingSchemaInstance);
    Container.set('BuildingRepo', buildingRepoInstance);

    const buildingServiceClass = require('../src/services/buildingService').default;
    buildingServiceInstance = Container.get(buildingServiceClass);
    Container.set('BuildingService', buildingServiceInstance);

    const buildingControllerClass = require('../src/controllers/buildingController').default;
    buildingControllerInstance = Container.get(buildingControllerClass);
    Container.set('BuildingController', buildingControllerInstance);
    done();
  });

  afterEach(function() {
    sandbox.restore();
  });

  describe('create building', () => {
    it.skip('success - building created', async function() {
      // Arrange
      const req = {
        body: {
          code: 'B1',
          name: 'Building B1',
          length: 80,
          width: 10,
        },
      } as any;
      const res = {} as any;
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      const next = () => {};

      sandbox.replace(
        buildingRepoInstance,
        'save',
        sinon.fake(building => building as any),
      );

      // Act
      await buildingControllerInstance.createBuilding(
        (req as any) as Request,
        (res as any) as Response,
        next as NextFunction,
      );

      // Assert
      sinon.assert.calledWith(res.status, sinon.match(201));
      sinon.assert.calledWith(res.json, sinon.match.has('id'));
      sinon.assert.calledWith(
        res.json,
        sinon.match({
          code: 'B1',
          name: 'Building B1',
          length: 80,
          width: 10,
        }),
      );
    });

    it.skip('fail - invalid data 400', async function() {
      // Arrange
      const req = {
        body: {
          tare: 0,
          maxWeight: 0,
          maxCharge: 0,
          range: 0,
          chargingTime: 0, // -- fails
        },
        params: { id: 'foobar' },
      } as any;

      const res = {} as any;
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      const next = () => {};

      sandbox.replace(
        buildingRepoInstance,
        'save',
        sinon.fake(building => building as any),
      );

      // Act
      await buildingControllerInstance.createBuilding(
        (req as any) as Request,
        (res as any) as Response,
        next as NextFunction,
      );

      // Assert
      sinon.assert.calledWith(res.status, sinon.match(400));
      sinon.assert.calledOnce(res.json);
      sinon.assert.calledWith(res.json, sinon.match.has('errors'));
    });
  });

  // describe('edit building', () => {
  //   it('success - complete update', async function() {
  //     // Arrange
  //     const req = {
  //       body: {
  //         tare: 10,
  //         maxWeight: 10,
  //         maxCharge: 10,
  //         range: 10,
  //         chargingTime: 10,
  //       },
  //       params: { id: 'foobar' },
  //     } as any;
  //     const res = {} as any;
  //     res.status = sinon.stub().returns(res);
  //     res.json = sinon.stub().returns(res);
  //     const next = () => {};

  //     sandbox.replace(
  //       buildingSchemaInstance,
  //       'findOne',
  //       sinon.fake(
  //         ({ domainId }) =>
  //           ({
  //             tare: 99,
  //             maxWeight: 99,
  //             maxCharge: 99,
  //             range: 99,
  //             chargingTime: 99,
  //             domainId,
  //           } as any),
  //       ),
  //     );

  //     sandbox.replace(
  //       buildingRepoInstance,
  //       'save',
  //       sinon.fake(building => building as any),
  //     );

  //     // Act
  //     await buildingControllerInstance.updateBuilding(
  //       (req as any) as Request,
  //       (res as any) as Response,
  //       next as NextFunction,
  //     );

  //     // Assert
  //     sinon.assert.calledWith(res.status, sinon.match(200));
  //     sinon.assert.calledWith(
  //       res.json,
  //       sinon.match({
  //         id: 'foobar',
  //         tare: 10,
  //         maxWeight: 10,
  //         maxCharge: 10,
  //         range: 10,
  //         chargingTime: 10,
  //       }),
  //     );
  //   });

  //   it('success - partial update', async function() {
  //     // Arrange
  //     const req = {
  //       body: {
  //         tare: 10,
  //         maxWeight: 10,
  //       },
  //       params: { id: 'foobar' },
  //     } as any;
  //     const res = {} as any;
  //     res.status = sinon.stub().returns(res);
  //     res.json = sinon.stub().returns(res);
  //     const next = () => {};

  //     sandbox.replace(
  //       buildingSchemaInstance,
  //       'findOne',
  //       sinon.fake(
  //         ({ domainId }) =>
  //           ({
  //             tare: 99,
  //             maxWeight: 99,
  //             maxCharge: 99,
  //             range: 99,
  //             chargingTime: 99,
  //             domainId,
  //           } as any),
  //       ),
  //     );

  //     sandbox.replace(
  //       buildingRepoInstance,
  //       'save',
  //       sinon.fake(building => building as any),
  //     );

  //     // Act
  //     await buildingControllerInstance.updateBuilding(
  //       (req as any) as Request,
  //       (res as any) as Response,
  //       next as NextFunction,
  //     );

  //     // Assert
  //     sinon.assert.calledWith(res.status, sinon.match(200));
  //     sinon.assert.calledWith(
  //       res.json,
  //       sinon.match({
  //         id: 'foobar',
  //         tare: 10,
  //         maxWeight: 10,
  //         maxCharge: 99,
  //         range: 99,
  //         chargingTime: 99,
  //       }),
  //     );
  //   });

  //   it('fail - missing id param 404', async function() {
  //     // Arrange
  //     const req = {
  //       body: {
  //         tare: 0,
  //         maxWeight: 0,
  //         maxCharge: 0,
  //         range: 0,
  //         chargingTime: 0, // -- fails
  //       },
  //       params: {},
  //     } as any;
  //     const res = {} as any;
  //     res.status = sinon.stub().returns(res);
  //     const next = () => {};

  //     // Act
  //     await buildingControllerInstance.updateBuilding(
  //       (req as any) as Request,
  //       (res as any) as Response,
  //       next as NextFunction,
  //     );

  //     // Assert
  //     sinon.assert.calledWith(res.status, sinon.match(404));
  //   });

  //   it('fail - invalid data 400', async function() {
  //     // Arrange
  //     const req = {
  //       body: {
  //         tare: 0,
  //         maxWeight: 0,
  //         maxCharge: 0,
  //         range: 0,
  //         chargingTime: 0, // -- fails
  //       },
  //       params: { id: 'foobar' },
  //     } as any;

  //     const res = {} as any;
  //     res.status = sinon.stub().returns(res);
  //     res.json = sinon.stub().returns(res);
  //     const next = () => {};

  //     sandbox.replace(
  //       buildingSchemaInstance,
  //       'findOne',
  //       sinon.fake(
  //         ({ domainId }) =>
  //           ({
  //             tare: 99,
  //             maxWeight: 99,
  //             maxCharge: 99,
  //             range: 99,
  //             chargingTime: 99,
  //             domainId,
  //           } as any),
  //       ),
  //     );

  //     // Act
  //     await buildingControllerInstance.updateBuilding(
  //       (req as any) as Request,
  //       (res as any) as Response,
  //       next as NextFunction,
  //     );

  //     // Assert
  //     sinon.assert.calledWith(res.status, sinon.match(400));
  //     sinon.assert.calledOnce(res.json);
  //     sinon.assert.calledWith(res.json, sinon.match.has('errors'));
  //   });
  // });
});
