const StubValidator = require('../../../../core/stub/StubValidator')
const FakeLocationsInMemRepository = require('../../repositories/fake/FakeLocationsInMemRepository')
const DeleteLocationInteractor = require('../../../../core/use_cases/DeleteLocationInteractor')
const StubRequestModel = require('../../../../core/stub/StubRequestModel')
const StubEntity = require('../../../../core/entities/StubEntity');

const STUB_ID = 4711
const STUB_NAME = "stub"

let validator = new StubValidator()
let repo = new FakeLocationsInMemRepository();
let interactor = new DeleteLocationInteractor(repo, validator)
let req;
let res;

beforeAll(() => {
  // fixture setup
  repo.clear();
  repo.save(new StubEntity(STUB_ID, STUB_NAME));
  req = new StubRequestModel(STUB_ID);
})

afterAll(() => {
  // fixture teardown
  repo.clear();
});

test(`Should return the deleted entity from the repo with the specified id ${STUB_ID}`, () => {
  res = interactor.execute(req);
  expect(res).toBeDefined();
  expect(res.id).toBe(STUB_ID);
  expect(res.location).toBe(STUB_NAME);
  expect(res.error_msg).toBeNull();
})

test('should return error since you try to delete an entity from repo which is not there', () => {
  res = interactor.execute(new StubRequestModel(STUB_ID+1));
  expect(res.id).toBeNull();
  expect(res.location).toBeNull();
  expect(res.error_msg).toBeDefined();
  expect(res.error_msg).toBe("No Entity With That ID in DB");
})
