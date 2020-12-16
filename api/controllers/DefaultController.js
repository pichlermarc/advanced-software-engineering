/**
 * The DefaultController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic reoutes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/DefaultService');
const locationGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.locationGET);
};

const locationLocationIdDELETE = async (request, response) => {
  await Controller.handleRequest(request, response, service.locationLocationIdDELETE);
};

const locationLocationIdGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.locationLocationIdGET);
};

const locationLocationIdPOST = async (request, response) => {
  await Controller.handleRequest(request, response, service.locationLocationIdPOST);
};

const locationLocationIdTableGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.locationLocationIdTableGET);
};

const locationLocationIdTablePOST = async (request, response) => {
  await Controller.handleRequest(request, response, service.locationLocationIdTablePOST);
};

const locationLocationIdTableTableIdDELETE = async (request, response) => {
  await Controller.handleRequest(request, response, service.locationLocationIdTableTableIdDELETE);
};

const locationLocationIdTableTableIdGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.locationLocationIdTableTableIdGET);
};

const locationLocationIdTableTableIdPOST = async (request, response) => {
  await Controller.handleRequest(request, response, service.locationLocationIdTableTableIdPOST);
};

const locationLocationIdTableTableIdRegisterPOST = async (request, response) => {
  await Controller.handleRequest(request, response, service.locationLocationIdTableTableIdRegisterPOST);
};

const locationPOST = async (request, response) => {
  await Controller.handleRequest(request, response, service.locationPOST);
};

const locationPUT = async (request, response) => {
  await Controller.handleRequest(request, response, service.locationPUT);
};


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
