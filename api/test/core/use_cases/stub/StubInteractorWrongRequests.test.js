const StubValidator = require('../../../../core/use_cases/stub/StubValidator')
const FakeStubInMemRepository = require('./fake/FakeStubInMemRepository')
const StubInteractor = require('../../../../core/use_cases/stub/StubInteractor')
const StubRequestModel = require('../../../../core/use_cases/stub/StubRequestModel')
const StubEntity = require('../../../../core/entities/StubEntity')

let stub_validator = new StubValidator()
let stub_repo = new FakeStubInMemRepository();
let stub_interactor = new StubInteractor(stub_repo, stub_validator)

beforeEach(() => {
    // fixture setup
    stub_repo.clear();
})

afterEach(() => {
    // fixture teardown
});

test('should create error message in response if id is less than zero', () => {
    let stub_req = new StubRequestModel(-1)
    const stub_response = stub_interactor.execute(stub_req)
    expect(stub_response.id).toBe(-1)
    expect(stub_response.error_msg).toBe("Id must not be less than zero!")
})

test('should not create error message in response if id is zero', () => {
    let entity = new StubEntity(0, "");
    stub_repo.save(entity);
    let stub_req = new StubRequestModel(0)
    const stub_response = stub_interactor.execute(stub_req)
    expect(stub_response.id).toBe(0)
    expect(stub_response.error_msg).toBeNull()
})

test('should not create error message in response if id is one', () => {
    let entity = new StubEntity(1, "");
    stub_repo.save(entity);
    let stub_req = new StubRequestModel(1)
    const stub_response = stub_interactor.execute(stub_req)
    expect(stub_response.id).toBe(1)
    expect(stub_response.error_msg).toBeNull()
})
