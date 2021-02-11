const Validator = require('../../../core/validation/LocationIdTableIdTableValidator')
const GuestRegistrationInMemRepository = require('../../../core/repositories/GuestRegistrationInMemRepository')
const UpdateTableAtLocationInteractor = require('../../../core/use_cases/UpdateTableAtLocationInteractor')
const RequestModel = require('../../../core/requestModels/LocationIdTableIdTableRequestModel')
const Table = require('../../../core/entities/Table');
const Location = require('../../../core/entities/Location');

const LOCATION_ID = 4711;
const LOCATION_NAME = "DummyLocation";
const TABLE_ID = 4712;
const TABLE_NAME = "Table1";

let validator = new Validator()
let repo = new GuestRegistrationInMemRepository();
let interactor = new UpdateTableAtLocationInteractor(repo, validator)
let req = new RequestModel(LOCATION_ID, TABLE_ID);
let table;

beforeAll(() => {
  // fixture setup before all
  repo.clear();
  repo.save_location(new Location(LOCATION_ID, LOCATION_NAME));
  repo.save_table(new Table(TABLE_ID, TABLE_NAME, LOCATION_ID, -2.5, 3.66));
})

beforeEach(() => {
  // fixture setup before each test
  table = new Table(TABLE_ID, "newTableName", LOCATION_ID);
})

afterAll(() => {
  // fixture teardown
  repo.clear();
});

test(`Should return the id and the name from the updated table: ${TABLE_ID}`, async () => {
  let res = await interactor.execute(new RequestModel(LOCATION_ID, TABLE_ID, table));
  expect(res).toBeDefined();
  expect(res.entity.id).toBe(TABLE_ID);
  expect(res.entity.name).toBe(table.name);
  expect(res.error_msg).toBeNull();
  expect(res.status).toBe(200);
})

test('should return error since you try to update a table from repo which is not there', async () => {
  repo.clear_table();
  let res = await interactor.execute(new RequestModel(TABLE_ID, LOCATION_ID, table));
  expect(res.entity).toBeNull();
  expect(res.error_msg).toBe("The given location id or table id was not found in the database");
  expect(res.status).toBe(404);
})

test('should return error since you try to delete a table from a location which is not there', async () => {
  repo.clear_location();
  repo.clear_table(); //also needs to be done, as the InMem-repo is not aware that the reference from a table to its location is not valid any more
  let res = await interactor.execute(new RequestModel(TABLE_ID, LOCATION_ID, table));
  expect(res.entity).toBeNull();
  expect(res.error_msg).toBe("The given location id or table id was not found in the database");
  expect(res.status).toBe(404);
})

test('should return validator error since location id < 0', async () => {
  let res = await interactor.execute(new RequestModel(TABLE_ID, -1, table));
  expect(res.entity).toBeNull();
  expect(res.error_msg).toBe("Id must not be less than zero!");
  expect(res.status).toBe(400);
})

test('should return validator error since table id < 0', async () => {
  let res = await interactor.execute(new RequestModel(-1, LOCATION_ID, table));
  expect(res.entity).toBeNull();
  expect(res.error_msg).toBe("Id must not be less than zero!");
  expect(res.status).toBe(400);
})

test('should return validator error since table id inside table object is < 0', async () => {
  table.id = -1;
  let res = await interactor.execute(new RequestModel(TABLE_ID, LOCATION_ID, table));
  expect(res.entity).toBeNull();
  expect(res.error_msg).toBe("Id must not be less than zero!");
  expect(res.status).toBe(400);
})

test('should return validator error since name inside table object is empty', async () => {
  table.name = "";
  let res = await interactor.execute(new RequestModel(TABLE_ID, LOCATION_ID, table));
  expect(res.entity).toBeNull();
  expect(res.error_msg).toBe("Name must not be empty!");
  expect(res.status).toBe(400);
})
