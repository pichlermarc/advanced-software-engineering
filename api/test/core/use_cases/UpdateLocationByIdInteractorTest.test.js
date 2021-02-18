const LocationValidator = require('../../../core/validation/LocationValidator')
const IdValidator = require('../../../core/validation/IdValidator')
const GuestRegistrationInMemRepository = require('../../../core/repositories/GuestRegistrationInMemRepository')
const UpdateLocationByIdInteractor = require('../../../core/use_cases/UpdateLocationByIdInteractor')
const LocationRequestModel = require('../../../core/requestModels/LocationRequestModel')
const Location = require('../../../core/entities/Location');

const OLD_LOCATION_ID = 4711;
const OLD_LOCATION_NAME = "location-dummy";
const NEW_LOCATION_ID = 815;
const NEW_LOCATION_NAME = "new location";

let idvalidator = new IdValidator();
let locationvalidator = new LocationValidator();
let repo = new GuestRegistrationInMemRepository();
let interactor = new UpdateLocationByIdInteractor(repo, idvalidator, locationvalidator);
let old_location = new Location(OLD_LOCATION_ID, OLD_LOCATION_NAME);
let new_location = new Location(NEW_LOCATION_ID, NEW_LOCATION_NAME);
let request_model = new LocationRequestModel(NEW_LOCATION_ID, new_location);
let res;

beforeEach(() => {
  repo.clear();
  repo.save_location(old_location);
})

test('should correctly update a location, update location name only', async () => {
  let request_model = new LocationRequestModel(OLD_LOCATION_ID, NEW_LOCATION_NAME);
  res = await interactor.execute(request_model);
  expect(res).toBeDefined();
  expect(res.id).toBe(OLD_LOCATION_ID);
  expect(res.name).toBe(NEW_LOCATION_NAME);
  expect(res.error_msg).toBeNull();
  expect(repo.location_repo[0].name).toBe(NEW_LOCATION_NAME);
  expect(repo.location_repo[0].id).toBe(OLD_LOCATION_ID);
})

test('should try to update non-existing location', async () => {
  repo.clear();
  res = await interactor.execute(request_model);
  expect(res).toBeDefined();
  expect(res.error_msg).not.toBeNull();
})

test('test request with invalid locationId', async () => {
  let invalid_location = new Location(-2, 'new-location-name');
  request_model = new LocationRequestModel(-1, invalid_location);
  res = await interactor.execute(request_model);
  expect(res.error_msg).toBe("Id must not be less than zero!");
})
