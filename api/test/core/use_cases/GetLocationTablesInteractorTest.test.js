const GuestRegistrationInMemRepository = require('../../../core/repositories/GuestRegistrationInMemRepository');
const Location = require('../../../core/entities/Location');
const Table = require('../../../core/entities/Table');
const LocationIdValidator = require('../../../core/validation/LocationIdValidator');
const RequestModel = require('../../../core/requestModels/LocationIdRequestModel');
const GetLocationTablesInteractor = require('../../../core/use_cases/GetLocationTablesInteractor');

let repo = new GuestRegistrationInMemRepository();
let validator = new LocationIdValidator();
let interactor = new GetLocationTablesInteractor(repo, validator);
let LOCATION_ID_1 = 1;
let LOCATION_ID_2 = 2;
let TABLE_NAME_1 = 'table-1';
let TABLE_NAME_3 = 'table-3';
let TABLE_NAME_4 = 'table-4';
let TABLE_NAME_6 = 'table-6';

beforeEach(() => {
  repo.clear();
  repo.save_location(new Location(LOCATION_ID_1,"location-test1"));
  repo.save_location(new Location(LOCATION_ID_2,"location-test2"));
  repo.save_table(new Table(1, TABLE_NAME_1, LOCATION_ID_1));
  repo.save_table(new Table(2,"table-2", LOCATION_ID_1));
  repo.save_table(new Table(3, TABLE_NAME_3, LOCATION_ID_1));
  repo.save_table(new Table(4, TABLE_NAME_4, LOCATION_ID_2));
  repo.save_table(new Table(5,"table-5", LOCATION_ID_2));
  repo.save_table(new Table(6, TABLE_NAME_6, LOCATION_ID_2));
});

test('should return stored tables associated with a locationId from repository', () => {
  let request_model = new RequestModel(LOCATION_ID_1);
  let res = interactor.execute(request_model);
  expect(res).toBeDefined();
  expect(res.location_list.length).toBe(3);
  expect(res.error_msg).toBeNull();
  expect(res.location_list[0].name).toBe(TABLE_NAME_1);
  expect(res.location_list[2].name).toBe(TABLE_NAME_3);

  request_model = new RequestModel(LOCATION_ID_2);
  res = interactor.execute(request_model);
  expect(res).toBeDefined();
  expect(res.location_list.length).toBe(3);
  expect(res.error_msg).toBeNull();
  expect(res.location_list[0].name).toBe(TABLE_NAME_4);
  expect(res.location_list[2].name).toBe(TABLE_NAME_6);
});

test('should create response with 0 locations, since location has no tables', () => {
  repo.clear();
  let request_model = new RequestModel(LOCATION_ID_2);
  res = interactor.execute(request_model);
  expect(res).toBeDefined();
  expect(res.error_msg).toBeNull();
  expect(res.location_list).toBeDefined();
  expect(res.location_list.length).toBe(0);
});

test('Test with non-existing locationId', () => {
  let INVALID_LOCATION_ID = 3;
  let request_model = new RequestModel(INVALID_LOCATION_ID);
  res = interactor.execute(request_model);
  expect(res).toBeDefined();
  expect(res.error_msg).toBeNull();
  expect(res.location_list.length).toBe(0);
});

test('Test with invalid locationId', () => {
  let INVALID_LOCATION_ID = -3;
  let request_model = new RequestModel(INVALID_LOCATION_ID);
  res = interactor.execute(request_model);
  expect(res).toBeDefined();
  expect(res.error_msg).not.toBeNull();
  expect(res.error_msg).toBe('Id must not be less than zero!');
});
