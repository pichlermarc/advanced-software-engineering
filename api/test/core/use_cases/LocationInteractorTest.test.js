const GuestRegistrationInMemRepository = require('../../../core/repositories/GuestRegistrationInMemRepository')
const LocationInteractor = require('../../../core/use_cases/GetLocationsInteractor')
const Location = require('../../../core/entities/Location');

let repo = new GuestRegistrationInMemRepository();
let interactor = new LocationInteractor(repo)
let res;

beforeAll(() => {
  repo.clear();
  repo.save_location(new Location(1,"test1"));
  repo.save_location(new Location(2,"test2"));
  repo.save_location(new Location(3,"test3"));
  repo.save_location(new Location(4,"test4"));
})

test('should return stored location from repository', () => {
  res = interactor.execute();
  expect(res).toBeDefined()
  expect(res.location_list.length).toBe(4)
  expect(res.error_msg).toBeNull()
})

test('should creae response with 0 locations, since repo is empty', () => {
  repo.clear();
  res = interactor.execute();
  expect(res).toBeDefined();
  expect(res.location_list.length).toBe(0);
})
