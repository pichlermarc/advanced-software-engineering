const LocationValidator = require('../../../core/validation/LocationValidator')
const GuestRegistrationInMemRepository = require('../../../core/repositories/GuestRegistrationInMemRepository')
const UpdateLocationInteractor = require('../../../core/use_cases/UpdateLocationInteractor')
const LocationRequestModel = require('../../../core/requestModels/LocationRequestModel')
const Location = require('../../../core/entities/Location');

const LOCATION_ID = 4711;
const LOCATION_NAME = "location-dummy";
const NEW_LOCATION_ID = 815;
const NEW_LOCATION_NAME = "new location";

let validator = new LocationValidator()
let repo = new GuestRegistrationInMemRepository();
let interactor = new UpdateLocationInteractor(repo, validator)
let location = new Location(LOCATION_ID, LOCATION_NAME);
let request_model = new LocationRequestModel(NEW_LOCATION_ID, NEW_LOCATION_NAME);
let res;

beforeEach(() => {
  repo.clear();
  repo.save_location(location);
})

test('should correctly update a location', () => {
  let re = repo.load();
  let request_model = new LocationRequestModel(LOCATION_ID, NEW_LOCATION_NAME); //old id, new name
  res = interactor.execute(request_model);
  expect(res).toBeDefined();
  expect(res.location).toBe(NEW_LOCATION_NAME);
  expect(res.error_msg).toBeNull();
  expect(repo.location_repo[0].name).toBe(NEW_LOCATION_NAME);
  expect(repo.location_repo[0].id).toBe(LOCATION_ID);
})

test('should try to update non-existing location', () => {
  res = interactor.execute(request_model);
  expect(res).toBeDefined();
  expect(res.error_msg).not.toBeNull();
})

test('validator must throw error because location name is empty', () => {
  location = new Location(LOCATION_ID, "");
  request_model = new LocationRequestModel(location.name);
  res = interactor.execute(request_model);
  expect(res.error_msg).toBe("Id must not be less than zero and location name must be not empty!");
})
