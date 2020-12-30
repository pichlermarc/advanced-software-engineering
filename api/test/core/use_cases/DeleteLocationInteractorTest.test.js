const Validator = require('../../../core/validation/LocationValidator')
const FakeGuestRegistrationInMemRepository = require('../repositories/fake/FakeGuestRegistrationInMemRepository')
const DeleteLocationInteractor = require('../../../core/use_cases/DeleteLocationInteractor')
const RequestModel = require('../../../core/requestModels/LocationRequestModel')
const Location = require('../../../core/entities/Location');

const LOCATION_ID = 4711
const LOCATION_NAME = "location-dummy"

let validator = new Validator()
let repo = new FakeGuestRegistrationInMemRepository();
let interactor = new DeleteLocationInteractor(repo, validator)
let req = new RequestModel(LOCATION_ID);

beforeAll(() => {
  // fixture setup
  repo.clear();
  repo.save_location(new Location(LOCATION_ID, LOCATION_NAME));
})

afterAll(() => {
  // fixture teardown
  repo.clear();
});

test(`Should return the id from the deleted location: ${LOCATION_ID}`, () => {
  let res = interactor.execute(req);
  expect(res).toBeDefined();
  expect(res.id).toBe(LOCATION_ID);
  expect(res.error_msg).toBeNull();
})

test('should return error since you try to delete an entity from repo which is not there', () => {
  let res = interactor.execute(new RequestModel(LOCATION_ID+1));
  expect(res.id).toBeNull();
  expect(res.location).toBeNull();
  expect(res.error_msg).toBeDefined();
  expect(res.error_msg).toBe("No Entity With That ID in DB");
})
