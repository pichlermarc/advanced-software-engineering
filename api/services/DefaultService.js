/* eslint-disable no-unused-vars */
const Service = require('./Service');
const StubRequestModel = require('../core/use_cases/stub/StubRequestModel');

/**
* Get your locations
* Get locations associated with your user
*
* returns List
* */
const locationGET = () => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
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
* Delete a specific location.
* Deletes the location with the location ID.
*
* locationId Long ID of the location to return.
* returns Location
* */
const locationLocationIdDELETE = ({ locationId }) => new Promise(
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
* Get a specific location.
* Gets the location with the location ID.
*
* locationId Long ID of the location to return.
* returns Location
* */
const locationLocationIdGET = ({ locationId }) => new Promise(
  async (resolve, reject) => {
      console.log("---locationLocationIdGET---");
    try {
        console.log("try to create RequestModel...")
        let requestmodel = new StubRequestModel(locationId);
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
