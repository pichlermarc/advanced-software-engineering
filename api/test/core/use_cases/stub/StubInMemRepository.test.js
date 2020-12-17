const StubInMemRepository = require('../../../../core/use_cases/stub/StubInMemRepository');
const StubEntity = require('../../../../core/entities/StubEntity');

let stub_repo = new StubInMemRepository();
let stub_entity = new StubEntity(4711, "stub-loc");

test('fixture stub_repo should be defined', () => {
    expect(stub_repo).toBeDefined()
})

test('fixture stub_entity should be defined', () => {
    expect(stub_entity).toBeDefined()
})
/*
test('should return right size for empty repo', () => {
    expect(stub_repo.size()).toBe(0);
})
*/

/*
test('should return right size for repo after saving entity', () => {
    stub_repo.save(stub_entity);
    expect(stub_repo.size()).toBe(1);
})*/