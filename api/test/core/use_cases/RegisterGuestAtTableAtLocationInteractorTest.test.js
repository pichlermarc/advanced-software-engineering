const Validator = require('../../../core/validation/LocationIdTableIdGuestValidator')
const GuestRegistrationInMemRepository = require('../../../core/repositories/GuestRegistrationInMemRepository')
const RegisterGuestAtTableAtLocationInteractor = require('../../../core/use_cases/RegisterGuestAtTableAtLocationInteractor')
const RequestModel = require('../../../core/requestModels/LocationIdTableIdGuestRequestModel')
const Table = require('../../../core/entities/Table');
const Location = require('../../../core/entities/Location');

const LOCATION_ID = 4711;
const LOCATION_NAME = "DummyLocation";
const TABLE_ID = 4712;
const TABLE_NAME = "Table1";
const PHONE = 1234;
const EMAIL = "admin@admin.admin";
const NAME = "Firstname Lastname";
let guest;

let validator = new Validator()
let repo = new GuestRegistrationInMemRepository();
let interactor = new RegisterGuestAtTableAtLocationInteractor(repo, validator)
let table;
let location;

beforeEach(() => {
  // fixture setup before each test
  location = new Location(LOCATION_ID, LOCATION_NAME);
  table = new Table(TABLE_ID, TABLE_NAME, LOCATION_ID);
  repo.save_location(location);
  repo.save_table(table);

  guest = {
    "phoneNumber": PHONE,
    "name": NAME,
    "email": EMAIL
  };
})

afterEach(() => {
  // fixture teardown
  repo.clear();
});

test('Should return the guest on successful registration', () => {
  let res = interactor.execute(new RequestModel(LOCATION_ID, TABLE_ID, guest));
  expect(res).toBeDefined();
  expect(res.phoneNumber).toBe(PHONE);
  expect(res.name).toBe(NAME);
  expect(res.email).toBe(EMAIL);
  expect(res.error_msg).toBeNull();
  expect(res.status).toBe(200);
})

test('should return error since you try to update a table from repo which is not there', () => {
  repo.clear_table();
  let res = interactor.execute(new RequestModel(TABLE_ID, LOCATION_ID, guest));
  expect(res.phoneNumber).toBeNull();
  expect(res.name).toBeNull();
  expect(res.email).toBeNull();
  expect(res.error_msg).toBe("Repo: FK Constraint violated: Location, or table is not existing!");
  expect(res.status).toBe(400);
})

test('should return error since you try to delete a table from a location which is not there', () => {
  repo.clear_location();
  repo.clear_table(); //also needs to be done, as the InMem-repo is not aware that the reference from a table to its location is not valid any more
  let res = interactor.execute(new RequestModel(TABLE_ID, LOCATION_ID, guest));
  expect(res.phoneNumber).toBeNull();
  expect(res.name).toBeNull();
  expect(res.email).toBeNull();
  expect(res.error_msg).toBe("Repo: FK Constraint violated: Location, or table is not existing!");
  expect(res.status).toBe(400);
})

test('should return validator error since location id < 0', () => {
  let res = interactor.execute(new RequestModel(TABLE_ID, -1, guest));
  expect(res.phoneNumber).toBeNull();
  expect(res.name).toBeNull();
  expect(res.email).toBeNull();
  expect(res.error_msg).toBe("Id must not be less than zero!");
  expect(res.status).toBe(400);
})

test('should return validator error since table id < 0', () => {
  let res = interactor.execute(new RequestModel(-1, LOCATION_ID, guest));
  expect(res.phoneNumber).toBeNull();
  expect(res.name).toBeNull();
  expect(res.email).toBeNull();
  expect(res.error_msg).toBe("Id must not be less than zero!");
  expect(res.status).toBe(400);
})

test('should return validator error since phone number is empty', () => {
  guest.phoneNumber = "";
  let res = interactor.execute(new RequestModel(TABLE_ID, LOCATION_ID, guest));
  expect(res.phoneNumber).toBeNull();
  expect(res.name).toBeNull();
  expect(res.email).toBeNull();
  expect(res.error_msg).toBe("Phone number must not be empty!");
  expect(res.status).toBe(400);
})

test('should return validator error since name is empty', () => {
  guest.name = "";
  let res = interactor.execute(new RequestModel(TABLE_ID, LOCATION_ID, guest));
  expect(res.phoneNumber).toBeNull();
  expect(res.name).toBeNull();
  expect(res.email).toBeNull();
  expect(res.error_msg).toBe("Name must not be empty!");
  expect(res.status).toBe(400);
})

test('should return validator error since email is empty', () => {
  guest.email = "";
  let res = interactor.execute(new RequestModel(TABLE_ID, LOCATION_ID, guest));
  expect(res.phoneNumber).toBeNull();
  expect(res.name).toBeNull();
  expect(res.email).toBeNull();
  expect(res.error_msg).toBe("Email must not be empty!");
  expect(res.status).toBe(400);
})
