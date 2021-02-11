const GuestRegistrationInMemRepository = require('../../../core/repositories/GuestRegistrationInMemRepository');
const Location = require('../../../core/entities/Location');

let location;
let repo = new GuestRegistrationInMemRepository();

beforeEach(() => {
    repo.clear_location();
    location = new Location(4711, "location-dummy");
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
    repo.save_location(location);
    expect(repo.size_location()).toBe(1);
})

test('should return undefined if location is not found', () => {
    let location_loaded = repo.load_location(4711);
    expect(location_loaded).toBeNull();
})

/**
 * NOTE: To catch an error that will be thrown in a function
 *          => you have to wrap the test-code in a function!
 * INFO: https://medium.com/@afolabiwaheed/how-to-test-a-function-thats-expected-to-throw-error-in-jest-2419cc7c6462
 */
/*
test('should throw an error if try to save an existing location', () => {
    repo.save_location(location);
    // That does NOT WORK!
    // This test will fail with next line!
    //expect(repo.save_location(location)).toThrowError(Error);
    // instead, wrap the function call in a separate function; see next test:
})
*/

test('should throw an error if try to save an existing location', () => {
    repo.save_location(location);
    expect(() => {
        repo.save_location(location);
    }).toThrowError(Error);
    expect(() => {
        repo.save_location(location);
    }).toThrowError(/^Repo: Location.*already exists!$/);
})

test('should throw error when reading from location with undefined id', () => {
    try {
        repo.load_location(undefined);
    } catch (e) {
        expect(e.message).toBe("Error in load_location: id is missing!")
    }
})

test('should update location with different name', () => {
    repo.save_location(location);
    location.name = "newLocation";
    let updated_location = repo.update_location(location);
    expect(repo.load_location(location.id).id).toBe(updated_location.id);
    expect(repo.load_location(location.id).name).toBe(updated_location.name);
})

test('should not update location as id is undefined', () => {
    try {
        location.id = undefined;
        let updated_location = repo.update_location(location);
    } catch (e) {
        expect(e.message).toBe("Method update_location fails.Error: Error in load_location: id is missing!");
    }
})

test('should not update location as it is unknown', () => {
    location.id = 123;
    let updated_location = repo.update_location(location);
    expect(updated_location).toBeUndefined();
})