const StubValidator = require('../../../../core/use_cases/stub/StubValidator')
const FakeStubInMemRepository = require('./fake/FakeStubInMemRepository')
const StubInteractor = require('../../../../core/use_cases/stub/StubInteractor')
const StubRequestModel = require('../../../../core/use_cases/stub/StubRequestModel')
const StubEntity = require('../../../../core/entities/StubEntity');

const STUB_ID = 4711
const STUB_LOC = "stub"

let stub_validator = new StubValidator()
let stub_repo = new FakeStubInMemRepository();
let stub_interactor = new StubInteractor(stub_repo, stub_validator)
let stub_req = new StubRequestModel(STUB_ID)
let stub_entity = new StubEntity(STUB_ID, STUB_LOC);
let stub_response;

beforeEach(() => {
    // fixture setup
    stub_repo.clear();
    stub_response = stub_interactor.execute(stub_entity)
})

afterEach(() => {
    // fixture teardown
});

test('should created correct response for valid request', () => {
    expect(stub_response).toBeDefined()
    expect(stub_response.id).toBe(stub_entity.id)
    expect(stub_response.location).toBe(STUB_LOC)
    expect(stub_response.error_msg).toBeNull()
})

test('should save new entity to DB', () => {
    expect(stub_repo.saveMethodWasCalled).toBe(true);
    expect(stub_repo.entityReceivedToTheSaveMethod).toBeDefined()
    expect(stub_repo.entityReceivedToTheSaveMethod.id).toBe(stub_entity.id)
    expect(stub_repo.entityReceivedToTheSaveMethod.location).toBe(stub_entity.location)
})
