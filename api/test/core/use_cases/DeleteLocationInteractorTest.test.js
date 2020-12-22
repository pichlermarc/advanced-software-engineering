const StubValidator = require('../../../core/stub/StubValidator')
const FakeGuestRegistrationInMemRepository = require('../repositories/fake/FakeGuestRegistrationInMemRepository')
const DeleteLocationInteractor = require('../../../core/use_cases/DeleteLocationInteractor')
const StubRequestModel = require('../../../core/stub/StubRequestModel')
const Location = require('../../../core/entities/Location');

const LOCATION_ID = 4711
const LOCATION_NAME = "location-dummy"

let validator = new StubValidator()
let repo = new FakeGuestRegistrationInMemRepository();
let interactor = new DeleteLocationInteractor(repo, validator)
let req;
let res;

beforeAll(() => {
  // fixture setup
  repo.clear();
  repo.save_location(new Location(LOCATION_ID, LOCATION_NAME));
  req = new StubRequestModel(LOCATION_ID);
})

afterAll(() => {
  // fixture teardown
  repo.clear();
});

test(`Should return the deleted entity from the repo with the specified id ${LOCATION_ID}`, () => {
  res = interactor.execute(req);
  expect(res).toBeDefined();
  expect(res.id).toBe(LOCATION_ID);
  expect(res.location).toBe(LOCATION_NAME);
  expect(res.error_msg).toBeNull();
})

test('should return error since you try to delete an entity from repo which is not there', () => {
  res = interactor.execute(new StubRequestModel(LOCATION_ID+1));
  expect(res.id).toBeNull();
  expect(res.location).toBeNull();
  expect(res.error_msg).toBeDefined();
  expect(res.error_msg).toBe("No Entity With That ID in DB");
})
