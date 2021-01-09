const AddLocationValidator = require('../../../core/validation/AddLocationValidator')
const GuestRegistrationInMemRepository = require('../../../core/repositories/GuestRegistrationInMemRepository')
const AddLocationInteractor = require('../../../core/use_cases/AddLocationInteractor')
const AddLocationRequestModel = require('../../../core/requestModels/AddLocationRequestModel')
const Location = require('../../../core/entities/Location');

const LOCATION_ID = 4711
const LOCATION_NAME = "location-dummy"

let validator = new AddLocationValidator()
let repo = new GuestRegistrationInMemRepository();
let interactor = new AddLocationInteractor(repo, validator)
let location = new Location(LOCATION_ID, LOCATION_NAME);
let request_model = new AddLocationRequestModel(location.name)
let res;

beforeEach(() => {
    repo.clear();
})


test('should create correct response for valid request', () => {
    res = interactor.execute(request_model);
    expect(res).toBeDefined()
    expect(res.name).toBe(LOCATION_NAME)
    expect(res.error_msg).toBeNull()
})

test('should save new entity to DB', () => {
    res = interactor.execute(request_model);
    expect(repo.load_location(res.id)).toStrictEqual(new Location(res.id, LOCATION_NAME));
})

test('validator must throw error because location name is empty', () => {
    location = new Location(LOCATION_ID, "");
    request_model = new AddLocationRequestModel(location.name);
    res = interactor.execute(request_model);
    expect(res.error_msg).toBe("Name must not be empty!");
    expect(repo.load_location(LOCATION_ID)).toBeUndefined();
})
