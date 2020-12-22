const FakeLocationsInMemRepository = require('../repositories/fake/FakeLocationsInMemRepository')
const LocationInteractor = require('../../../core/use_cases/LocationInteractor')
const StubEntity = require('../../../core/stub/StubEntity');

let repo = new FakeLocationsInMemRepository();
let interactor = new LocationInteractor(repo)
let res;

beforeAll(() => {
  // fixture setup
  repo.save(new StubEntity(1,"test1"));
  repo.save(new StubEntity(2,"test2"));
  repo.save(new StubEntity(3,"test3"));
  repo.save(new StubEntity(4,"test4"));
})

afterAll(() => {
  repo.clear();
})

test('should return all 4 stored entities in the repository', () => {
  res = interactor.execute();
  expect(res).toBeDefined()
  expect(res.entities.length).toBe(4)
  expect(res.error_msg).toBeNull()
})

test('should return 0, since repo is empty', () => {
  repo.clear();
  res = interactor.execute();
  expect(res).toBeDefined();
  expect(res.entities.length).toBe(0);
})

