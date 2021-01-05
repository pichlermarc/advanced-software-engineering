const TableValidator = require('../../../core/validation/TableValidator')
const LocationIdValidator = require('../../../core/validation/LocationIdValidator')
const GuestRegistrationInMemRepository = require('../../../core/repositories/GuestRegistrationInMemRepository')
const AddTableAtLocationInteractor = require('../../../core/use_cases/AddTableAtLocationInteractor')
const EntityRequestModel = require('../../../core/requestModels/EntityRequestModel')
const Location = require('../../../core/entities/Location');
const Table = require('../../../core/entities/Table');

const OLD_LOCATION_ID = 4711;
const OLD_LOCATION_NAME = "location-dummy";
const NEW_LOCATION_ID = 815;
const NEW_LOCATION_NAME = "new location";
const TABLE_NAME = 'Last table next to window';
const TABLE_ID = 1;

let idvalidator = new LocationIdValidator();
let tablevalidator = new TableValidator();
let repo = new GuestRegistrationInMemRepository();
let interactor = new AddTableAtLocationInteractor(repo, idvalidator, tablevalidator);
let old_location = new Location(OLD_LOCATION_ID, OLD_LOCATION_NAME);
let new_location = new Location(NEW_LOCATION_ID, NEW_LOCATION_NAME);
let request_model = new EntityRequestModel(NEW_LOCATION_ID, new_location);
let res;

beforeEach(() => {
  repo.clear();
  repo.save_location(old_location);
  repo.save_location(new_location);
})

test('should correctly add a new table to a specified location', () => {
  let new_table = new Table(TABLE_ID, TABLE_NAME, OLD_LOCATION_ID);
  let request_model = new EntityRequestModel(OLD_LOCATION_ID, new_table);
  res = interactor.execute(request_model);
  expect(res).toBeDefined();
  expect(res.entity).toBe(new_table);
  expect(res.error_msg).toBeNull();
  expect(repo.table_repo[0].name).toBe(TABLE_NAME);
  expect(repo.table_repo[0].id).toBe(TABLE_ID);
  expect(repo.table_repo.length).toBe(1);
})

test('should try to add already existing table to a location', () => {
  let table = new Table(TABLE_ID, TABLE_NAME, OLD_LOCATION_ID);
  repo.save_table(table);
  let request_model = new EntityRequestModel(OLD_LOCATION_ID, table);
  res = interactor.execute(request_model);
  expect(res).toBeDefined();
  expect(res.error_msg).not.toBeNull();
  expect(repo.table_repo.length).toBe(1);
})

test('should try to add table to non-existing location', () => {
  let table = new Table(TABLE_ID, TABLE_NAME, OLD_LOCATION_ID);
  let NONEXISTING_LOCATION_ID = 500;
  let request_model = new EntityRequestModel(NONEXISTING_LOCATION_ID, table);
  res = interactor.execute(request_model);
  expect(res).toBeDefined();
  expect(res.error_msg).not.toBeNull();
  expect(repo.table_repo.length).toBe(0);
})

test('should try to add table from location X to location Y', () => {
  let table = new Table(TABLE_ID, TABLE_NAME, OLD_LOCATION_ID);
  request_model = new EntityRequestModel(NEW_LOCATION_ID, table);
  res = interactor.execute(request_model);
  expect(res.error_msg).not.toBeNull();
  expect(repo.table_repo.length).toBe(0);
})

test('test request with invalid location-id', () => {
  let table = new Table(TABLE_ID,TABLE_NAME, OLD_LOCATION_ID);
  let INVALID_LOCATION_ID = -1;
  request_model = new EntityRequestModel(INVALID_LOCATION_ID, table);
  res = interactor.execute(request_model);
  expect(res.error_msg).not.toBeNull();
  expect(repo.table_repo.length).toBe(0);
})

test('test request with invalid table', () => {
  let table_with_invalid_locationId = new Table(TABLE_ID,TABLE_NAME, -1);
  request_model = new EntityRequestModel(OLD_LOCATION_ID, table_with_invalid_locationId);
  res = interactor.execute(request_model);
  expect(res.error_msg).not.toBeNull();
  expect(repo.table_repo.length).toBe(0);
})
