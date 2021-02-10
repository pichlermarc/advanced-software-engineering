const Validator = require('../../../core/validation/LocationIdTableIdValidator')
const GuestRegistrationInMemRepository = require('../../../core/repositories/GuestRegistrationInMemRepository')
const DeleteTableAtLocationInteractor = require('../../../core/use_cases/DeleteTableAtLocationInteractor')
const RequestModel = require('../../../core/requestModels/LocationIdTableIdRequestModel')
const Table = require('../../../core/entities/Table');
const Location = require('../../../core/entities/Location');

const LOCATION_ID = 4711;
const LOCATION_NAME = "DummyLocation";
const TABLE_ID = 4712;
const TABLE_NAME = "Table1";

let validator = new Validator()
let repo = new GuestRegistrationInMemRepository();
let interactor = new DeleteTableAtLocationInteractor(repo, validator)
let req = new RequestModel(LOCATION_ID, TABLE_ID);

beforeAll(() => {
  // fixture setup
  repo.clear();
  repo.save_location(new Location(LOCATION_ID, LOCATION_NAME));
  repo.save_table(new Table(TABLE_ID, TABLE_NAME, LOCATION_ID, -2.5, 3.66));
})

afterAll(() => {
  // fixture teardown
  repo.clear();
});

test(`Should return the id and the name from the deleted table: ${TABLE_ID}`, () => {
  let res = interactor.execute(req);
  expect(res).toBeDefined();
  expect(res.entity.id).toBe(TABLE_ID);
  expect(res.entity.name).toBe(TABLE_NAME);
  expect(res.error_msg).toBeNull();
  expect(res.status).toBe(200);
})

test('should return error since you try to delete a table from repo which is not there', () => {
  let res = interactor.execute(new RequestModel(TABLE_ID+1, LOCATION_ID));
  expect(res.entity).toBeNull();
  expect(res.error_msg).toBe("The given location id or table id was not found in the database");
  expect(res.status).toBe(404);
})

test('should return error since you try to delete a table from a location which is not there', () => {
  let res = interactor.execute(new RequestModel(TABLE_ID, LOCATION_ID+1));
  expect(res.entity).toBeNull();
  expect(res.error_msg).toBe("The given location id or table id was not found in the database");
  expect(res.status).toBe(404);
})

test('should return validator error since location id < 0', () => {
  let res = interactor.execute(new RequestModel(TABLE_ID, -1));
  expect(res.entity).toBeNull();
  expect(res.error_msg).toBe("Id must not be less than zero!");
  expect(res.status).toBe(405)
})

test('should return validator error since table id < 0', () => {
  let res = interactor.execute(new RequestModel(-1, LOCATION_ID));
  expect(res.entity).toBeNull();
  expect(res.error_msg).toBe("Id must not be less than zero!");
  expect(res.status).toBe(405)
})
