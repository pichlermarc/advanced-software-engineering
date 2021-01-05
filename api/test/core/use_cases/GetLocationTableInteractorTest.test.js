const GuestRegistrationInMemRepository = require('../../../core/repositories/GuestRegistrationInMemRepository');
const Location = require('../../../core/entities/Location');
const Table = require('../../../core/entities/Table');
const LocationIdTableIdValidator = require('../../../core/validation/LocationIdTableIdValidator');
const RequestModel = require('../../../core/requestModels/LocationIdTableIdRequestModel');
const GetLocationTableInteractor = require('../../../core/use_cases/GetLocationTableInteractor');

let repo = new GuestRegistrationInMemRepository();
let validator = new LocationIdTableIdValidator();
let interactor = new GetLocationTableInteractor(repo, validator);
let LOCATION_ID_1 = 1;
let LOCATION_ID_2 = 2;
let TABLE_NAME_1 = 'table-1';
let TABLE_NAME_2 = 'table-2';
let TABLE_NAME_3 = 'table-3';
let TABLE_NAME_4 = 'table-4';
let TABLE_NAME_5 = 'table-5';
let TABLE_ID_1 = 1;
let TABLE_ID_2 = 2;
let TABLE_ID_3 = 3;
let TABLE_ID_4 = 4;
let TABLE_ID_5 = 5;

beforeEach(() => {
  repo.clear();
  repo.save_location(new Location(LOCATION_ID_1,"location-test1"));
  repo.save_location(new Location(LOCATION_ID_2,"location-test2"));
  repo.save_table(new Table(TABLE_ID_1, TABLE_NAME_1, LOCATION_ID_1));
  repo.save_table(new Table(TABLE_ID_2, TABLE_NAME_2, LOCATION_ID_1));
  repo.save_table(new Table(TABLE_ID_3, TABLE_NAME_3, LOCATION_ID_1));
  repo.save_table(new Table(TABLE_ID_4, TABLE_NAME_4, LOCATION_ID_2));
  repo.save_table(new Table(TABLE_ID_5, TABLE_NAME_5, LOCATION_ID_2));
});

test('should return a specific stored table from a specific location with id locationId', () => {
  let request_model = new RequestModel(LOCATION_ID_1, TABLE_ID_2);
  let res = interactor.execute(request_model);
  expect(res).toBeDefined();
  expect(res.entity).toBeDefined();
  expect(res.error_msg).toBeNull();
  expect(res.entity.name).toBe(TABLE_NAME_2);
  expect(res.entity.id).toBe(TABLE_ID_2);
  expect(res.entity.location_id).toBe(LOCATION_ID_1);

  request_model = new RequestModel(LOCATION_ID_2, TABLE_ID_5);
  res = interactor.execute(request_model);
  expect(res).toBeDefined();
  expect(res.entity).toBeDefined();
  expect(res.error_msg).toBeNull();
  expect(res.entity.name).toBe(TABLE_NAME_5);
  expect(res.entity.id).toBe(TABLE_ID_5);
  expect(res.entity.location_id).toBe(LOCATION_ID_2);
});

test('test retrieval of non-existing tableid from specific locationid', () => {
  repo.clear();
  let NONEXISTING_TABLE_ID = 70;
  let request_model = new RequestModel(LOCATION_ID_2, NONEXISTING_TABLE_ID);
  let res = interactor.execute(request_model);
  expect(res).toBeDefined();
  expect(res.entity).toBeDefined();
  expect(res.error_msg).not.toBeNull();
  expect(res.entity).toBeNull();
});

test('Test with invalid locationId', () => {
  let INVALID_LOCATION_ID = -3;
  let request_model = new RequestModel(INVALID_LOCATION_ID, TABLE_ID_2);
  let res = interactor.execute(request_model);
  expect(res).toBeDefined();
  expect(res.error_msg).not.toBeNull();
  expect(res.error_msg).toBe('Id must not be less than zero!');
});

