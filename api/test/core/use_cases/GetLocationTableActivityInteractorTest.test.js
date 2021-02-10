const GuestRegistrationInMemRepository = require('../../../core/repositories/GuestRegistrationInMemRepository');
const GetLocationTableActivityInteractor = require('../../../core/use_cases/GetLocationTableActivityInteractor');
const LocationIdTableIdActivityValidator = require('../../../core/validation/LocationIdTableIdActivityValidator');
const Location = require('../../../core/entities/Location');
const Table = require('../../../core/entities/Table');
const Assign = require('../../../core/entities/Assign');
const RequestModel = require('../../../core/requestModels/LocationIdTableIdActivityRequestModel');

let repo = new GuestRegistrationInMemRepository();
let validator = new LocationIdTableIdActivityValidator();
let interactor = new GetLocationTableActivityInteractor(repo, validator);
let requestModel;
let res;

beforeAll(() => {
    repo.clear();
    repo.save_location(new Location(1,"loc1"));
    repo.save_table(new Table(1, "tab1", 1));
    repo.save_assign(new Assign(1, 1, Date.parse("2021-02-06T18:33:00.000+0200"), "Sepp", "Forcher", "+43 0000", "sepp@forcher.at"));
    repo.save_assign(new Assign(1, 1, Date.parse("2021-02-06T18:36:00.000+0200"), "Max", "Mustermann", "+43 0000", "max@mustermann.at"));
})

test('should return 1 as there is one assignment for the given time period', async () => {
    requestModel = new RequestModel(1, 1, "2021-02-06T18:32:00.000+0200", "2021-02-06T18:34:00.000+0200");
    res = await interactor.execute(requestModel);
    expect(res).toBeDefined();
    expect(res.activity).toBe(1);
    expect(res.error_msg).toBeNull();
    expect(res.status).toBe(200);
})

test('should return 0 as there is no assignment for the given time period', async () => {
    requestModel = new RequestModel(1, 1, "2021-02-06T18:34:00.000+0200", "2021-02-06T18:35:00.000+0200");
    res = await interactor.execute(requestModel);
    expect(res).toBeDefined();
    expect(res.activity).toBe(0);
    expect(res.error_msg).toBeNull();
    expect(res.status).toBe(200);
})

test('should return 2 as there are two assignments for the given time period', async () => {
    requestModel = new RequestModel(1, 1, "2021-02-06T18:32:00.000+0200", "2021-02-06T18:37:00.000+0200");
    res = await interactor.execute(requestModel);
    expect(res).toBeDefined();
    expect(res.activity).toBe(2);
    expect(res.error_msg).toBeNull();
    expect(res.status).toBe(200);
})

test('should return validator error as the location id is below 0', async () => {
    requestModel = new RequestModel(-1, 1, "2021-02-06T18:32:00.000+0200", "2021-02-06T18:37:00.000+0200");
    res = await interactor.execute(requestModel);
    expect(res).toBeDefined();
    expect(res.activity).toBeNull();
    expect(res.error_msg).toBe("Id must not be less than zero!");
    expect(res.status).toBe(400);
})

test('should return validator error as the table id is below 0', async () => {
    requestModel = new RequestModel(1, -1, "2021-02-06T18:32:00.000+0200", "2021-02-06T18:37:00.000+0200");
    res = await interactor.execute(requestModel);
    expect(res).toBeDefined();
    expect(res.activity).toBeNull();
    expect(res.error_msg).toBe("Id must not be less than zero!");
    expect(res.status).toBe(400);
})

test('should return validator error as the date time from is empty', async () => {
    requestModel = new RequestModel(1, 1, "", "2021-02-06T18:37:00.000+0200");
    res = await interactor.execute(requestModel);
    expect(res).toBeDefined();
    expect(res.activity).toBeNull();
    expect(res.error_msg).toBe("DateTimeFrom must not be empty!");
    expect(res.status).toBe(400);
})

test('should return validator error as the date time to is empty', async () => {
    requestModel = new RequestModel(1, 1, "2021-02-06T18:37:00.000+0200", "");
    res = await interactor.execute(requestModel);
    expect(res).toBeDefined();
    expect(res.activity).toBeNull();
    expect(res.error_msg).toBe("DateTimeTo must not be empty!");
    expect(res.status).toBe(400);
})

test('should return error as the location does not exist', async () => {
    requestModel = new RequestModel(2, 1, "2021-02-06T18:32:00.000+0200", "2021-02-06T18:37:00.000+0200");
    res = await interactor.execute(requestModel);
    expect(res).toBeDefined();
    expect(res.activity).toBeNull();
    expect(res.error_msg).toBe("Location not found!");
    expect(res.status).toBe(404);
})

test('should return error as the table does not exist', async () => {
    requestModel = new RequestModel(1, 2, "2021-02-06T18:32:00.000+0200", "2021-02-06T18:37:00.000+0200");
    res = await interactor.execute(requestModel);
    expect(res).toBeDefined();
    expect(res.activity).toBeNull();
    expect(res.error_msg).toBe("Table not found!");
    expect(res.status).toBe(404);
})