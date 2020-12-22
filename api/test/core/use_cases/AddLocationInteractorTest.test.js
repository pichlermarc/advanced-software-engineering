const AddLocationValidator = require('../../../core/validation/AddLocationValidator')
const FakeLocationsInMemRepository = require('../repositories/fake/FakeLocationsInMemRepository')
const AddLocationInteractor = require('../../../core/use_cases/AddLocationInteractor')
const AddLocationRequestModel = require('../../../core/requestModels/AddLocationRequestModel')
const Location = require('../../../core/entities/Location');

const LOCATION_ID = 4711
const LOCATION_NAME = "location-dummy"

let validator = new AddLocationValidator()
let repo = new FakeLocationsInMemRepository();
let interactor = new AddLocationInteractor(repo, validator)
let entity = new Location(LOCATION_ID, LOCATION_NAME);
let res;

beforeEach(() => {
    repo.clear();
})

test('should create correct response for valid request', () => {
    res = interactor.execute(entity);
    expect(res).toBeDefined()
    expect(res.name).toBe(LOCATION_NAME)
    expect(res.error_msg).toBeNull()
})

test('should save new entity to DB', () => {
    res = interactor.execute(entity);
    expect(repo.load(res.id)).toStrictEqual(new Location(res.id, LOCATION_NAME));
})

test('validator must throw error because location name is empty', () => {
    entity = new Location(LOCATION_ID, "");
    res = interactor.execute(entity);
    expect(res.error_msg).toBe("Name must not be empty!");
    expect(repo.load(LOCATION_ID)).toBeUndefined();
})
