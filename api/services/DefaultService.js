/* eslint-disable no-unused-vars */
const Service = require('./Service');

const AddLocationRequestModel = require('../core/requestModels/AddLocationRequestModel');
const GuestRegistrationPostgres = require('../core/repositories/GuestRegistrationPostgres');
const AddLocationValidator = require('../core/validation/AddLocationValidator');
const AddLocationInteractor = require('../core/use_cases/AddLocationInteractor');

let repository = new GuestRegistrationPostgres();

const GetLocationInteractor = require('../core/use_cases/GetLocationInteractor');
const GetLocationsInteractor = require('../core/use_cases/GetLocationsInteractor');
const DeleteLocationInteractor = require('../core/use_cases/DeleteLocationInteractor');
const LocationIdRequestModel = require('../core/requestModels/LocationIdRequestModel');
const IdValidator = require('../core/validation/IdValidator');
const LocationRequestModel = require('../core/requestModels/LocationRequestModel');
const LocationValidator = require('../core/validation/LocationValidator');
const UpdateLocationInteractor = require('../core/use_cases/UpdateLocationInteractor');
const UpdateLocationByIdInteractor = require('../core/use_cases/UpdateLocationByIdInteractor');
const GetLocationTablesInteractor = require('../core/use_cases/GetLocationTablesInteractor');
const EntityRequestModel = require('../core/requestModels/EntityRequestModel');
const TableValidator = require('../core/validation/TableValidator');
const LocationIdTableIdRequestModel = require('../core/requestModels/LocationIdTableIdRequestModel');
const GetLocationTableInteractor = require('../core/use_cases/GetLocationTableInteractor');
const LocationIdTableIdValidator = require('../core/validation/LocationIdTableIdValidator');
const DeleteTableAtLocation = require('../core/use_cases/DeleteTableAtLocationInteractor');
const LocationIdTableIdTableRequestModel = require('../core/requestModels/LocationIdTableIdTableRequestModel');
const LocationIdTableIdTableValidator = require('../core/validation/LocationIdTableIdTableValidator');
const UpdateTableAtLocationInteractor = require('../core/use_cases/UpdateTableAtLocationInteractor');
const LocationIdTableIdGuestRequestModel = require('../core/requestModels/LocationIdTableIdGuestRequestModel');
const LocationIdTableIdGuestValidator = require('../core/validation/LocationIdTableIdGuestValidator');
const RegisterGuestAtTableAtLocationInteractor = require('../core/use_cases/RegisterGuestAtTableAtLocationInteractor');
const ReportRequestModel = require('../core/requestModels/ReportRequestModel');
const ReportValidator = require('../core/validation/ReportValidator');
const GetReportInteractor = require('../core/use_cases/GetReportInteractor');
const PDFReporter = require('../core/use_cases/report/PDFReporter').PDFReporter;
const XLSReporter = require('../core/use_cases/report/XLSReporter').XLSReporter;
const LocationIdTableIdActivityRequestModel = require('../core/requestModels/LocationIdTableIdActivityRequestModel');
const LocationIdTableIdActivityValidator = require('../core/validation/LocationIdTableIdActivityValidator');
const GetLocationTableActivityInteractor = require('../core/use_cases/GetLocationTableActivityInteractor');
const AddTableAtLocationInteractor = require('../core/use_cases/AddTableAtLocationInteractor')

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

      let interactor = new GetLocationsInteractor(repository);

      let responsemodel = await interactor.execute();

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
      resolve(Service.successResponse(responsemodel.location_list));
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
      let requestmodel = new LocationIdRequestModel(locationId);

      let validator = new IdValidator();
      let interactor = new DeleteLocationInteractor(repository, validator);

      let responsemodel = await interactor.execute(requestmodel);

      if(responsemodel.error_msg !== null) {
        throw {
          name: "LocationNotFoundException",
          message: responsemodel.error_msg,
          status: responsemodel.status || 404,
          toString: function() {
            return this.name + ": " + this.message;
          }
        };
      }
      resolve(Service.successResponse({
          "id": responsemodel.id,
          "name": responsemodel.name}, 200));
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
      console.log("---locationLocationIdGET---get location with given id---");
    try {
        let requestmodel = new LocationIdRequestModel(locationId);
        let validator = new IdValidator();
        let interactor = new GetLocationInteractor(repository, validator);

        let responsemodel = await interactor.execute(requestmodel);

        if(responsemodel.error_msg !== null) {
            throw {
                name: "LocationNotFoundException",
                message: responsemodel.error_msg,
                status: 404,
                toString: function() {
                    return this.name + ": " + this.message;
                }
            };
        }

      resolve(Service.successResponse({
          "id": responsemodel.id,
          "name": responsemodel.name
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
    console.log("---locationLocationIdPOST---update existing Location---");
    try {
      let requestmodel = new LocationRequestModel(locationId, location.name);

      let idvalidator = new IdValidator();
      let locationvalidator = new LocationValidator();
      let interactor = new UpdateLocationByIdInteractor(repository, idvalidator, locationvalidator);

      let responsemodel = await interactor.execute(requestmodel);

      if(responsemodel.error_msg !== null) {
        throw {
          name: "UpdateLocationException",
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
      }, 200));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 400,
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
    console.log("---locationLocationIdTableGET---return list of tables associated with this location---");
    try {
      let requestmodel = new LocationIdRequestModel(locationId);
      let validator = new IdValidator();
      let interactor = new GetLocationTablesInteractor(repository, validator);

      let responsemodel = await interactor.execute(requestmodel);

      if(responsemodel.error_msg !== null) {
        throw {
          name: "LocationNotFoundException",
          message: responsemodel.error_msg,
          status: 405,
          toString: function() {
            return this.name + ": " + this.message;
          }
        };
      }

      resolve(Service.successResponse(
        responsemodel.location_list
      ));
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
    console.log("---locationLocationIdTablePOST---add a table on the specified location---");
    try {
      let requestmodel = new EntityRequestModel(locationId, table);

      let idvalidator = new IdValidator();
      let tablevalidator = new TableValidator();

      let interactor = new AddTableAtLocationInteractor(repository, idvalidator, tablevalidator);

      let responsemodel = await interactor.execute(requestmodel);

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
          "id": responsemodel.entity.id,
          "name": responsemodel.entity.name,
          "xCoordinate": responsemodel.entity.xCoordinate,
          "yCoordinate": responsemodel.entity.yCoordinate
      }, 200));
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
      console.log("---locationLocationIdTableTableIdDELETE---");
      try {
          let requestmodel = new LocationIdTableIdRequestModel(locationId, tableId);

          let validator = new LocationIdTableIdValidator();
          let interactor = new DeleteTableAtLocation(repository, validator);

          let responsemodel = await interactor.execute(requestmodel);

          if(responsemodel.error_msg !== null) {
              throw {
                  name: "LocationOrTableNotFoundException",
                  message: responsemodel.error_msg,
                  status: 404,
                  toString: function() {
                      return this.name + ": " + this.message;
                  }
              };
          }
          resolve(Service.successResponse({
              "id": responsemodel.entity.id,
              "name": responsemodel.entity.name,
              "xCoordinate": responsemodel.entity.xCoordinate,
              "yCoordinate": responsemodel.entity.yCoordinate
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
* Get table with given id
*
* locationId Long ID of the location to return.
* tableId Long ID of the table to return.
* returns single table
* */
const locationLocationIdTableTableIdGET = ({ locationId, tableId }) => new Promise(
  async (resolve, reject) => {
    console.log("---locationLocationIdTableTableIdGET---return one specific table from the specified location---");
    try {
      let requestmodel = new LocationIdTableIdRequestModel(locationId, tableId);
      let validator = new LocationIdTableIdValidator();
      let interactor = new GetLocationTableInteractor(repository, validator);

      let responsemodel = await interactor.execute(requestmodel);

      if(responsemodel.error_msg !== null) {
          throw {
            name: "LocationOrTableNotFoundException",
            message: responsemodel.error_msg,
            status: 404,
            toString: function () {
              return this.name + ": " + this.message;
            }
          };
      }
      resolve(Service.successResponse({
          "name": responsemodel.entity.name,
          "id": responsemodel.entity.id,
          "xCoordinate": responsemodel.entity.xCoordinate,
          "yCoordinate": responsemodel.entity.yCoordinate
      }, 200));
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
      console.log("---locationLocationIdTableTableIdPOST---update an existing table---");
      try {
          let requestmodel = new LocationIdTableIdTableRequestModel(locationId, tableId, table);

          let validator = new LocationIdTableIdTableValidator();
          let interactor = new UpdateTableAtLocationInteractor(repository, validator);

          let responsemodel = await interactor.execute(requestmodel);

          if(responsemodel.error_msg !== null) {
              throw {
                  name: "LocationOrTableNotFoundException",
                  message: responsemodel.error_msg,
                  status: 400,
                  toString: function() {
                      return this.name + ": " + this.message;
                  }
              };
          }
          resolve(Service.successResponse({
              "id": responsemodel.entity.id,
              "name": responsemodel.entity.name,
              "xCoordinate": responsemodel.entity.xCoordinate,
              "yCoordinate": responsemodel.entity.yCoordinate
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
      console.log("---locationLocationIdTableTableIdRegisterPOST---register a guest on a table---");
      try {
          let requestmodel = new LocationIdTableIdGuestRequestModel(locationId, tableId, guest);

          let validator = new LocationIdTableIdGuestValidator();
          let interactor = new RegisterGuestAtTableAtLocationInteractor(repository, validator);

          let responsemodel = await interactor.execute(requestmodel);

          if(responsemodel.error_msg !== null) {
              throw {
                  name: "RegisterException",
                  message: responsemodel.error_msg,
                  status: 400,
                  toString: function() {
                      return this.name + ": " + this.message;
                  }
              };
          }

          resolve(Service.successResponse({
              "phoneNumber": responsemodel.phoneNumber,
              "name": responsemodel.name,
              "email": responsemodel.email
          }, 200));
      } catch (e) {
          reject(Service.rejectResponse(
              e.message || 'Invalid input',
              e.status || 400,
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

          let responsemodel = await interactor.execute(requestmodel);

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
          }, 200));
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
    console.log("---locationPUT---update existing Location---");
    try {
      let requestmodel = new LocationRequestModel(location.id, location.name);

      let validator = new LocationValidator();
      let interactor = new UpdateLocationInteractor(repository, validator);

      let responsemodel = await interactor.execute(requestmodel);

      if(responsemodel.error_msg !== null) {
        throw {
          name: "UpdateLocationException",
          message: responsemodel.error_msg,
          status: responsemodel.status || 404,
          toString: function() {
            return this.name + ": " + this.message;
          }
        };
      }

      resolve(Service.successResponse({
        "id": responsemodel.id,
        "name": responsemodel.name
      }, 200));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 400,
      ));
    }
  },
);

/**
 * Get report of an existing table at a location at given/requested time
 * Get report of table at location at time
 *
 * locationId
 * tableId
 * datetimeFrom
 * datetimeTo
 * reportType ('pdf' for PDF report, else xls report)
 * returns report of all assigns in requested period at Location and table
 * */
const locationLocationIdTableTableIdReportGET = ({ locationId, tableId, datetimeFrom, datetimeTo, reportType }) => new Promise(
    async (resolve, reject) => {
        console.log("---locationLocationIdTableTableIdReportGET---get report---");
        try {
            let requestmodel = new ReportRequestModel(locationId, tableId, datetimeFrom, datetimeTo);

            let validator = new ReportValidator();
            let reporter = reportType === 'pdf' ? new PDFReporter('output.pdf') : new XLSReporter('output.xlsx');
            let interactor = new GetReportInteractor(repository, validator, reporter);

            let responsemodel = await interactor.execute(requestmodel);

            if(responsemodel.error_msg !== null) {
                throw {
                    name: "GetReportException",
                    message: responsemodel.error_msg,
                    status: 400,
                    toString: function() {
                        return this.name + ": " + this.message;
                    }
                };
            }

            resolve(Service.successResponse({
                'locationId': requestmodel.location_id,
                'tableId': requestmodel.table_id,
                'datetimeFrom': requestmodel.datetimeFrom,
                'datetimeTo': requestmodel.datetimeTo,
                'report': responsemodel.entity
            }, 200));
        } catch (e) {
            reject(Service.rejectResponse(
                e.message || 'Invalid input',
                e.status || 400,
            ));
        }
    },
);

/**
 * Get the amount of people registered on a given table in the given time-range.
 *
 * locationId
 * tableId
 * from
 * to
 *
 * returns number of guests as int
 * */
const locationLocationIdTableTableIdActivityGET = ({ locationId, tableId, from, to }) => new Promise(
    async (resolve, reject) => {
        console.log("---locationLocationIdTableTableIdActivityGET---get current activity for a table---");
        try {
            let requestmodel = new LocationIdTableIdActivityRequestModel(locationId, tableId, from, to);

            let validator = new LocationIdTableIdActivityValidator();
            let interactor = new GetLocationTableActivityInteractor(repository, validator);

            let responsemodel = await interactor.execute(requestmodel);

            if(responsemodel.error_msg !== null) {
                throw {
                    name: "GetActivityException",
                    message: responsemodel.error_msg,
                    status: 404,
                    toString: function() {
                        return this.name + ": " + this.message;
                    }
                };
            }

            resolve(Service.successResponse({
                'activity': responsemodel.activity
            }, 200));
        } catch (e) {
            reject(Service.rejectResponse(
                e.message || 'Invalid input',
                e.status || 400,
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
  locationLocationIdTableTableIdReportGET,
  locationLocationIdTableTableIdActivityGET
};
