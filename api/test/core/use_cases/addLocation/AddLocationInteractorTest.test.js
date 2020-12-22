const AddLocationValidator = require('../../../../core/validation/AddLocationValidator')
const FakeLocationsInMemRepository = require('../../repositories/fake/FakeLocationsInMemRepository')
const AddLocationInteractor = require('../../../../core/use_cases/AddLocationInteractor')
const AddLocationRequestModel = require('../../../../core/requestModels/AddLocationRequestModel')
const StubEntity = require('../../../../core/entities/StubEntity');

const STUB_ID = 4711
const STUB_NAME = "stub"

let validator = new AddLocationValidator()
let repo = new FakeLocationsInMemRepository();
let interactor = new AddLocationInteractor(repo, validator)
let req = new AddLocationRequestModel(STUB_NAME)
let entity = new StubEntity(STUB_ID, STUB_NAME);
let res;

beforeEach(() => {
    // fixture setup
    repo.clear();
})

afterEach(() => {
    // fixture teardown
    repo.clear();
});

test('should create correct response for valid request', () => {
    res = interactor.execute(entity);
    expect(res).toBeDefined()
    expect(res.name).toBe(STUB_NAME)
    expect(res.error_msg).toBeNull()
})

test('should save new entity to DB', () => {
    res = interactor.execute(entity);
    expect(repo.load(res.id)).toStrictEqual(new StubEntity(res.id, STUB_NAME));
})

test('validator must throw error because location name is empty', () => {
    entity = new StubEntity(STUB_ID, "");
    res = interactor.execute(entity);
    expect(res.error_msg).toBe("Name must not be empty!");
    expect(repo.load(STUB_ID)).toBeUndefined();
})
