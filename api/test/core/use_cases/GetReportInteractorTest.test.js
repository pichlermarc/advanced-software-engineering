const Validator = require('../../../core/validation/ReportValidator')
const GetReportInteractor = require('../../../core/use_cases/GetReportInteractor')
const RequestModel = require('../../../core/requestModels/ReportRequestModel')
const {eLocation, eTable, eAssign} = require("../../../core/entities")
const fs = require('fs');
const path = require('path');
const GuestRegistrationInMemRepository = require('../../../core/repositories/GuestRegistrationInMemRepository');
const PDFReporter = require('../../../core/use_cases/report/PDFReporter').PDFReporter;
// const XLSReporter = require('../../../core/use_cases/report/XLSReporter').XLSReporter;

let DATETIMETO = Date.now();
let DATETIMEFROM =  DATETIMETO - 60*60*1000;
let validator = new Validator()
let interactor;
let pdfreporter;
let xlsreporter;
let postgres;
let location_1 = new eLocation(0, "Seekaffee");
let location_2 = new eLocation(1, "Hafenstadt");
let table_1;
let table_2;
let table_3;
let table_4;
let table_5;

const hour_in_seconds = 1 * 60 * 60;
const time_1 = new Date().getTime();
const time_2 = new Date().getTime() - hour_in_seconds;
const time_3 = new Date().getTime() - 2 * hour_in_seconds;
const time_4 = new Date().getTime() - 1/2 * hour_in_seconds;
const time_5 = new Date().getTime() - 3 * hour_in_seconds;
let assign_1;
let assign_2;
let assign_3;
let assign_4;
let assign_5;
let assign_6;
let assign_7;
let assign_8;
let assign_9;
let assign_list = [
  assign_1, assign_2, assign_3, assign_4, assign_5,
  assign_6, assign_7, assign_8, assign_9
]
let dirpath = path.join(__dirname,'/buildOfTests_canBeDeleted');

describe('Test GetReportInteractor UnitTests ', () => {

  beforeAll(() => {
    postgres = new GuestRegistrationInMemRepository();
    fs.mkdir(dirpath,(err) => {
      }); // temp dir for test outputs, is removed in afterAll
    try {
      location_1 = postgres.save_location(location_1);
      location_2 = postgres.save_location(location_2);

      table_1 = new eTable(2, "vip", location_1.id);
      table_2 = new eTable(3, "black", location_1.id);
      table_3 = new eTable(4, "vip", location_1.id);
      table_4 = new eTable(5, "vip", location_1.id);
      table_5 = new eTable(6, "vip", location_1.id);

      table_1 = postgres.save_table(table_1);
      table_2 = postgres.save_table(table_2);
      table_3 = postgres.save_table(table_3);
      table_4 = postgres.save_table(table_4);
      table_5 = postgres.save_table(table_5);

      assign_1 = postgres.save_assign(new eAssign(location_1.id, table_1.id, time_1, "Sepp", "Forcher", "01 234567", "sepp@tv.at"));
      assign_2 = postgres.save_assign(new eAssign(location_1.id, table_1.id, time_2, "Richard", "Stallman", "02 234567", "robert@freedom.org"));
      assign_3 = postgres.save_assign(new eAssign(location_1.id, table_1.id, time_3, "Dr.", "Oetker", "03 234567", "dr.oetker@schoko.muffin"));
      assign_4 = postgres.save_assign(new eAssign(location_1.id, table_2.id, time_4, "Arabella", "Kiesbauer", "04 234567", "arabella@kiesi.at"));
      assign_5 = postgres.save_assign(new eAssign(location_1.id, table_3.id, time_5, "Martin", "Puntigam", "05 234567", "martin@sience-busters.at"));
      assign_6 = postgres.save_assign(new eAssign(location_1.id, table_3.id, time_1, "Robert", "Martin", "06 234567", "oncle-bob@clean.code"));
      assign_7 = postgres.save_assign(new eAssign(location_1.id, table_4.id, time_2, "Cpt.", "Picard", "07 234567", "Cpt.Picard@energy.com"));
      assign_8 = postgres.save_assign(new eAssign(location_1.id, table_4.id, time_3, "Richard", "Lugner", "08 234567", "richard.lugner@loewe.sex"));
      assign_9 = postgres.save_assign(new eAssign(location_1.id, table_5.id, time_4, "Christine", "Aschbacher", "09 234567", "c.aschi@meine.idee"));

    } catch (err) {
      console.error(err)
      throw err;
    }
  });

  afterAll(  () => {
    fs.rmdirSync(dirpath, {recursive:true});
    postgres.connection_close();
  });

  test('Should return the report as base64 string', async () => {
    pdfreporter = new PDFReporter(path.join(dirpath,'output.pdf'));
    let pdfreporterSpy = jest.spyOn(pdfreporter, 'createDocument').mockImplementation(() => Promise.resolve('done'));

    //  xlsreporter = new XLSReporter('output.pdf');
    interactor = new GetReportInteractor(postgres, validator, pdfreporter);

    let res = await interactor.execute(new RequestModel(location_1.id, table_1.id, DATETIMEFROM, DATETIMETO));
    expect(res).toBeDefined();
    expect(res.error_msg).toBeNull();
    expect(res.status).toBe(200);
    expect(res.entity).toBe('done'.toString('base64')); // report generation is mocked, therefore expected return is 'done' in base64.
  })

  test('Should fail in report generation and throw error', async () => {
    pdfreporter = new PDFReporter(path.join(dirpath,'output.pdf'));
    let pdfreporterSpy = jest.spyOn(pdfreporter, 'createDocument').mockImplementation(() => Promise.reject(new Error('Report generation failed!')));

    //  xlsreporter = new XLSReporter('output.pdf');
    interactor = new GetReportInteractor(postgres, validator, pdfreporter);

    let res = await interactor.execute(new RequestModel(location_1.id, table_1.id, DATETIMEFROM, DATETIMETO));
    expect(res).toBeDefined();
    expect(res.error_msg).not.toBeNull();
    expect(res.status).toBe(400);
  })

  test("should fail in validator due to datetimeFrom after datetimeTo", async () => {
    pdfreporter = new PDFReporter(path.join(dirpath,'output.pdf'));
    let pdfreporterSpy = jest.spyOn(pdfreporter, 'createDocument').mockImplementation(() => Promise.resolve('done'));

    interactor = new GetReportInteractor(postgres, validator, pdfreporter);

    let res = await interactor.execute(new RequestModel(location_1.id, table_1.id, DATETIMETO, DATETIMEFROM));
    expect(res).toBeDefined();
    expect(res.error_msg).not.toBeNull();
    expect(res.status).toBe(400);
  })

  test("should fail due to invalid table id", async () => {
    pdfreporter = new PDFReporter(path.join(dirpath,'output.pdf'));
    let pdfreporterSpy = jest.spyOn(pdfreporter, 'createDocument').mockImplementation(() => Promise.resolve('done'));

    interactor = new GetReportInteractor(postgres, validator, pdfreporter);

    let res = await interactor.execute(new RequestModel(location_1.id, -100, DATETIMETO, DATETIMEFROM));
    expect(res).toBeDefined();
    expect(res.error_msg).not.toBeNull();
    expect(res.status).toBe(400);
  })

  test("should fail due to invalid location id", async () => {
    pdfreporter = new PDFReporter(path.join(dirpath,'output.pdf'));
    let pdfreporterSpy = jest.spyOn(pdfreporter, 'createDocument').mockImplementation(() => Promise.resolve('done'));

    interactor = new GetReportInteractor(postgres, validator, pdfreporter);

    let res = await interactor.execute(new RequestModel(-100, table_1.id, DATETIMETO, DATETIMEFROM));
    expect(res).toBeDefined();
    expect(res.error_msg).not.toBeNull();
    expect(res.status).toBe(400);
  })

  test("should fail due to missing To-time", async () => {
    pdfreporter = new PDFReporter(path.join(dirpath,'output.pdf'));
    let pdfreporterSpy = jest.spyOn(pdfreporter, 'createDocument').mockImplementation(() => Promise.resolve('done'));

    interactor = new GetReportInteractor(postgres, validator, pdfreporter);

    let res = await interactor.execute(new RequestModel(location_1.id, table_1.id, null, DATETIMEFROM));
    expect(res).toBeDefined();
    expect(res.error_msg).not.toBeNull();
    expect(res.status).toBe(400);
  })

  test("should fail due to missing From-time", async () => {
    pdfreporter = new PDFReporter(path.join(dirpath,'output.pdf'));
    let pdfreporterSpy = jest.spyOn(pdfreporter, 'createDocument').mockImplementation(() => Promise.resolve('done'));

    interactor = new GetReportInteractor(postgres, validator, pdfreporter);

    let res = await interactor.execute(new RequestModel(location_1.id, table_1.id, DATETIMETO, null));
    expect(res).toBeDefined();
    expect(res.error_msg).not.toBeNull();
    expect(res.status).toBe(400);
  })

})

