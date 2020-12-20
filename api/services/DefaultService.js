/* eslint-disable no-unused-vars */
const Service = require('./Service');
const StubRequestModel = require('../core/use_cases/stub/StubRequestModel');
const StubValidator = require('../core/use_cases/stub/StubValidator');
const InMemRepository = require('../core/repository/InMemRepository');
const StubInteractor = require('../core/use_cases/stub/StubInteractor');

const AddLocationRequestModel = require('../core/requestModels/AddLocationRequestModel');
const LocationsInMemRepository = require('../core/repositories/LocationsInMemRepository');
const AddLocationValidator = require('../core/validation/AddLocationValidator');
const AddLocationInteractor = require('../core/use_cases/addLocation/AddLocationInteractor');

let repository = new LocationsInMemRepository();

const LocationInteractor = require('../core/use_cases/location/LocationInteractor');
const DeleteLocationInteractor = require('../core/use_cases/location/DeleteLocationInteractor');

/**
* Get your locations
* Get locations associated with your user
*
* returns List
* */
const locationGET = () => new Promise(
  async (resolve, reject) => {
    console.log("---locationGET---");
    try {
      let repository = new InMemRepository();
      let interactor = new LocationInteractor(repository);

      let responsemodel = interactor.execute();

      if(responsemodel.error_msg !== null) {
        throw {
          name: "LocationException",
          message: responsemodel.error_msg,
          status: 405,
          toString: function() {
            return this.name + ": " + this.message;
          }
        };
      }
      resolve(Service.successResponse(responsemodel.entities));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || responsemodel.error_msg,
        e.status || 405,
      ));
    }
  },
);
/**
* Delete a specific location.
* Deletes the location with the location ID.
*
* locationId Long ID of the location to return.
* returns Location
* */
const locationLocationIdDELETE = ({ locationId }) => new Promise(
  async (resolve, reject) => {
    console.log("---locationLocationIdDELETE---");
    try {
      let requestmodel = new StubRequestModel(locationId);
      let repository = new InMemRepository();
      let validator = new StubValidator();
      let interactor = new DeleteLocationInteractor(repository, validator);

      let responsemodel = interactor.execute(requestmodel);

      if(responsemodel.error_msg !== null) {
        throw {
          name: "StubException",
          message: responsemodel.error_msg,
          status: 405,
          toString: function() {
            return this.name + ": " + this.message;
          }
        };
      }
      resolve(Service.successResponse({"id": responsemodel.id, "name": responsemodel.location}));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Get a specific location.
* Gets the location with the location ID.
*
* locationId Long ID of the location to return.
* returns Location
* */
const locationLocationIdGET = ({ locationId }) => new Promise(
  async (resolve, reject) => {
      console.log("---locationLocationIdGET---process-the-stub-usecase---");
    try {
        let requestmodel = new StubRequestModel(locationId);
        let validator = new StubValidator();
        let interactor = new StubInteractor(repository, validator);

        let responsemodel = interactor.execute(requestmodel);

        if(responsemodel.error_msg !== null) {
            throw {
                name: "StubException",
                message: responsemodel.error_msg,
                status: 405,
                toString: function() {
                    return this.name + ": " + this.message;
                }
            };
        }

      resolve(Service.successResponse({
        "id": responsemodel.id,
          "name": responsemodel.location
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Update an existing location
* Update a location
*
* locationId Long ID of the location to return.
* location Location  (optional)
* returns Location
* */
const locationLocationIdPOST = ({ locationId, location }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        locationId,
        location,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Get your location's tables
* Get tables associated with this location
*
* locationId Long ID of the location to return.
* returns List
* */
const locationLocationIdTableGET = ({ locationId }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        locationId,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Add a new table on this location
* Add a table
*
* locationId Long ID of the location to return.
* table Table  (optional)
* returns Table
* */
const locationLocationIdTablePOST = ({ locationId, table }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        locationId,
        table,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Delete this table
* Delete the table on this location.
*
* locationId Long ID of the location to return.
* tableId Long ID of the location to return.
* returns List
* */
const locationLocationIdTableTableIdDELETE = ({ locationId, tableId }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        locationId,
        tableId,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Get your tables
* Get tables associated with this location
*
* locationId Long ID of the location to return.
* tableId Long ID of the location to return.
* returns List
* */
const locationLocationIdTableTableIdGET = ({ locationId, tableId }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        locationId,
        tableId,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Update an existing table
* Update a table
*
* locationId Long ID of the location to return.
* tableId Long ID of the location to return.
* table Table  (optional)
* returns Table
* */
const locationLocationIdTableTableIdPOST = ({ locationId, tableId, table }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        locationId,
        tableId,
        table,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Register on this table on this location.
* Register on this table on this location.
*
* locationId Long ID of the location to register on.
* tableId Long ID of the table to register on.
* guest Guest  (optional)
* returns Guest
* */
const locationLocationIdTableTableIdRegisterPOST = ({ locationId, tableId, guest }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        locationId,
        tableId,
        guest,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Add a new location
* Add a location
*
* location Location  (optional)
* returns Location
* */
const locationPOST = ({ location }) => new Promise(
  async (resolve, reject) => {
      console.log("---locationPOST---process-the-addLocation-usecase---");
      try {
          let requestmodel = new AddLocationRequestModel(location.name);

          let validator = new AddLocationValidator();
          let interactor = new AddLocationInteractor(repository, validator);

          let responsemodel = interactor.execute(requestmodel);

          if(responsemodel.error_msg !== null) {
              throw {
                  name: "AddLocationException",
                  message: responsemodel.error_msg,
                  status: 400,
                  toString: function() {
                      return this.name + ": " + this.message;
                  }
              };
          }

          resolve(Service.successResponse({
              "id": responsemodel.id,
              "name": responsemodel.name
          }, 201));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 400,
      ));
    }
  },
);
/**
* Update an existing location
* Update a location
*
* location Location  (optional)
* returns Location
* */
const locationPUT = ({ location }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        location,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

module.exports = {
  locationGET,
  locationLocationIdDELETE,
  locationLocationIdGET,
  locationLocationIdPOST,
  locationLocationIdTableGET,
  locationLocationIdTablePOST,
  locationLocationIdTableTableIdDELETE,
  locationLocationIdTableTableIdGET,
  locationLocationIdTableTableIdPOST,
  locationLocationIdTableTableIdRegisterPOST,
  locationPOST,
  locationPUT,
};
