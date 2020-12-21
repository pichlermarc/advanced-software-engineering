const GuestRegistrationInMemRepository = require('../../../core/repositories/GuestRegistrationInMemRepository');
const Guest = require('../../../core/entities/Guest');

let guest = new Guest(6911, "guest-dummy", "guest.dummy-1@x.y", "01-234-567891");
let repo = new GuestRegistrationInMemRepository();

beforeEach(() => {
    // fixture setup
    repo.clear_guest();
})

afterEach(() => {
    // fixture teardown
});


test('fixture repo should be defined', () => {
    expect(repo).toBeDefined()
})

test('fixture guest should be defined', () => {
    expect(guest).toBeDefined()
})

test('should return right size for empty repo', () => {
    expect(repo.size_guest()).toBe(0)
})

test('should return right size for repo after saving one guest', () => {
    repo.save_guest(guest);
    expect(repo.size_guest()).toBe(1)
})

test('should load same guest from repo that has recently been stored', () => {
    repo.save_guest(guest)
    let guest_loaded = repo.load_guest(guest.id)
    expect(guest.id).toBe(guest_loaded.id)
    expect(guest.name).toBe(guest_loaded.name)
})

test('should remove right guest from repo', () => {
    repo.save_guest(guest);
    let guest2 = new Guest(4712, "guest-dummy-2", "guest.dummy-1@x.y", "01-234-567891");
    repo.save_guest(guest2);
    expect(repo.size_guest()).toBe(2);
    let guest_removed = repo.remove_guest(guest2.id);
    expect(guest2.id).toBe(guest_removed.id)
    expect(repo.size_guest()).toBe(1);
})

test('should clear repository: remove all guests', () => {
    repo.save_guest(new Guest(6911, "guest-dummy-1"), "guest.dummy-1@x.y", "01-234-567891");
    repo.save_guest(new Guest(6912, "guest-dummy-2"), "guest.dummy-2@x.y", "01-234-567892");
    repo.save_guest(new Guest(6913, "guest-dummy-3"), "guest.dummy-3@x.y", "01-234-567893");
    expect(repo.size_guest()).toBe(3);
    repo.clear_guest()
    expect(repo.size_guest()).toBe(0);
    repo.save_guest(new Guest(6913, "guest-dummy-1"), "guest.dummy-1@x.y", "01-234-567891");
    expect(repo.size_guest()).toBe(1);
})

test('should return undefined if guest is not found', () => {
    let guest_loaded = repo.load_guest(6911);
    expect(guest_loaded).toBeUndefined();
})