const StubInMemRepository = require('../../../core/stub/InMemRepository');
const StubEntity = require('../../../core/stub/StubEntity');

let stub_entity = new StubEntity(4711, "stub-loc");
let stub_repo = new StubInMemRepository();

beforeEach(() => {
    // fixture setup
    stub_repo.clear();
})

afterEach(() => {
    // fixture teardown
});


test('fixture stub_repo should be defined', () => {
    expect(stub_repo).toBeDefined()
})

test('fixture stub_entity should be defined', () => {
    expect(stub_entity).toBeDefined()
})

test('should return right size for empty repo', () => {
    expect(stub_repo.size()).toBe(0)
})

test('should return right size for repo after saving entity', () => {
    stub_repo.save(stub_entity);
    expect(stub_repo.size()).toBe(1)
})

test('should return an array with one element after saving one entity', () => {
    stub_repo.save(stub_entity);
    let entities = [];
    entities.push(stub_entity);
    expect(stub_repo.load()).toStrictEqual(entities);
})

test('should load same entity from repo that has recently been stored', () => {
    stub_repo.save(stub_entity)
    let entity_loaded = stub_repo.load(stub_entity.id)
    expect(stub_entity.id).toBe(entity_loaded.id)
    expect(stub_entity.location).toBe(entity_loaded.location)
})

test('should remove right entity from repo', () => {
    stub_repo.save(stub_entity);
    let stub_entity2 = new StubEntity(4712, "stub-loc-2");
    stub_repo.save(stub_entity2);
    expect(stub_repo.size()).toBe(2);
    let entity_removed = stub_repo.remove(stub_entity2.id);
    expect(stub_entity2.id).toBe(entity_removed.id)
    expect(stub_repo.size()).toBe(1);
})

test('should clear repository: remove all entities', () => {
    stub_repo.save(new StubEntity(4711, "stub-loc-1"));
    stub_repo.save(new StubEntity(4712, "stub-loc-2"));
    stub_repo.save(new StubEntity(4713, "stub-loc-3"));
    expect(stub_repo.size()).toBe(3);
    stub_repo.clear()
    expect(stub_repo.size()).toBe(0);
    stub_repo.save(new StubEntity(4711, "stub-loc-1"));
    expect(stub_repo.size()).toBe(1);

})
