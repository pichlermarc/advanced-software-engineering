const GuestRegistrationInMemRepository = require('../../../core/repositories/GuestRegistrationInMemRepository');
const Location = require('../../../core/entities/Location');

let location = new Location(4711, "location-dummy");
let repo = new GuestRegistrationInMemRepository();

beforeEach(() => {
    repo.clear_location();
})

test('fixture repo should be defined', () => {
    expect(repo).toBeDefined()
})

test('fixture location should be defined', () => {
    expect(location).toBeDefined()
})

test('should return right size for empty repo', () => {
    expect(repo.size_location()).toBe(0)
})

test('should return right size for repo after saving one location', () => {
    repo.save_location(location);
    expect(repo.size_location()).toBe(1)
})

test('should load same location from repo that has recently been stored', () => {
    repo.save_location(location)
    let location_loaded = repo.load_location(location.id)
    expect(location.id).toBe(location_loaded.id)
    expect(location.name).toBe(location_loaded.name)
})

test('should remove right location from repo', () => {
    repo.save_location(location);
    let location2 = new Location(4712, "location-dummy-2");
    repo.save_location(location2);
    expect(repo.size_location()).toBe(2);
    let location_removed = repo.remove_location(location2.id);
    expect(location2.id).toBe(location_removed.id)
    expect(repo.size_location()).toBe(1);
})

test('should clear repository: remove all locations', () => {
    repo.save_location(new Location(4711, "location-dummy-1"));
    repo.save_location(new Location(4712, "location-dummy-2"));
    repo.save_location(new Location(4713, "location-dummy-3"));
    expect(repo.size_location()).toBe(3);
    repo.clear_location()
    expect(repo.size_location()).toBe(0);
    repo.save_location(new Location(4711, "location-dummy-1"));
    expect(repo.size_location()).toBe(1);
})

test('should return undefined if location is not found', () => {
    let location_loaded = repo.load_location(4711);
    expect(location_loaded).toBeUndefined();
})
