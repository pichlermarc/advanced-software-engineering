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
    repo.save_assign_g2t(new Assign(1, 1, Date.parse("2021-02-06T18:33:00.000+0200"), "Sepp", "Forcher", "+43 0000", "sepp@forcher.at"));
    repo.save_assign_g2t(new Assign(1, 1, Date.parse("2021-02-06T18:36:00.000+0200"), "Max", "Mustermann", "+43 0000", "max@mustermann.at"));
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

test('should return 2 as there are assignments for the given time period', async () => {
    requestModel = new RequestModel(1, 1, "2021-02-06T18:32:00.000+0200", "2021-02-06T18:37:00.000+0200");
    res = await interactor.execute(requestModel);
    expect(res).toBeDefined();
    expect(res.activity).toBe(2);
    expect(res.error_msg).toBeNull();
    expect(res.status).toBe(200);
})