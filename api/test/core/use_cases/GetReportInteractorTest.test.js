const Validator = require('../../../core/validation/ReportValidator')
const GetReportInteractor = require('../../../core/use_cases/GetReportInteractor')
const RequestModel = require('../../../core/requestModels/ReportRequestModel')
const {eLocation, eTable, eAssign} = require("../../../core/entities")
const fs = require('fs');
const GuestRegistrationPostgres = require('../../../core/repositories/GuestRegistrationPostgres');
const PDFReporter = require('../../../core/use_cases/report/PDFReporter').PDFReporter;
// const XLSReporter = require('../../../core/use_cases/report/XLSReporter').XLSReporter;

let DATETIMETO = Date.now();
let DATETIMEFROM =  DATETIMETO - 60*60*1000;
let validator = new Validator()
let interactor;
let pdfreporter;
let xlsreporter;
let postgres;
let location_1;
let location_2;
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

describe('Integration test - postgres/sequelize: filter assign testing ', () => {

  beforeAll(async () => {
    postgres = new GuestRegistrationPostgres();

    try {
      location_1 = await postgres.save_location(new eLocation(null, "Seekaffee"));
      location_2 = await postgres.save_location(new eLocation(null, "Hafenstadt"));

      table_1 = await postgres.save_table(new eTable(null, "vip", location_1.id));
      table_2 = await postgres.save_table(new eTable(null, "black", location_1.id));
      table_3 = await postgres.save_table(new eTable(null, "vip", location_1.id));
      table_4 = await postgres.save_table(new eTable(null, "vip", location_1.id));
      table_5 = await postgres.save_table(new eTable(null, "vip", location_1.id));

      assign_1 = await postgres.save_assign(new eAssign(location_1.id, table_1.id, time_1, "Sepp", "Forcher", "01 234567", "sepp@tv.at"));
      assign_2 = await postgres.save_assign(new eAssign(location_1.id, table_1.id, time_2, "Richard", "Stallman", "02 234567", "robert@freedom.org"));
      assign_3 = await postgres.save_assign(new eAssign(location_1.id, table_1.id, time_3, "Dr.", "Oetker", "03 234567", "dr.oetker@schoko.muffin"));
      assign_4 = await postgres.save_assign(new eAssign(location_1.id, table_2.id, time_4, "Arabella", "Kiesbauer", "04 234567", "arabella@kiesi.at"));
      assign_5 = await postgres.save_assign(new eAssign(location_1.id, table_3.id, time_5, "Martin", "Puntigam", "05 234567", "martin@sience-busters.at"));
      assign_6 = await postgres.save_assign(new eAssign(location_1.id, table_3.id, time_1, "Robert", "Martin", "06 234567", "oncle-bob@clean.code"));
      assign_7 = await postgres.save_assign(new eAssign(location_2.id, table_4.id, time_2, "Cpt.", "Picard", "07 234567", "Cpt.Picard@energy.com"));
      assign_8 = await postgres.save_assign(new eAssign(location_2.id, table_4.id, time_3, "Richard", "Lugner", "08 234567", "richard.lugner@loewe.sex"));
      assign_9 = await postgres.save_assign(new eAssign(location_2.id, table_5.id, time_4, "Christine", "Aschbacher", "09 234567", "c.aschi@meine.idee"));

    } catch (err) {
      console.error(err)
      throw err;
    }
  });

  afterAll( () => {
    postgres.connection_close();
  });

  test('Should return the report as base64 string', async () => {
    pdfreporter = new PDFReporter('output.pdf');
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
    pdfreporter = new PDFReporter('output.pdf');
    let pdfreporterSpy = jest.spyOn(pdfreporter, 'createDocument').mockImplementation(() => Promise.reject(new Error('Report generation failed!')));

    //  xlsreporter = new XLSReporter('output.pdf');
    interactor = new GetReportInteractor(postgres, validator, pdfreporter);

    let res = await interactor.execute(new RequestModel(location_1.id, table_1.id, DATETIMEFROM, DATETIMETO));
    expect(res).toBeDefined();
    expect(res.error_msg).not.toBeNull();
    expect(res.status).toBe(400);
  })

  test("should fail in validator due to datetimeFrom after datetimeTo", async () => {
    pdfreporter = new PDFReporter('output.pdf');
    let pdfreporterSpy = jest.spyOn(pdfreporter, 'createDocument').mockImplementation(() => Promise.resolve('done'));

    interactor = new GetReportInteractor(postgres, validator, pdfreporter);

    let res = await interactor.execute(new RequestModel(location_1.id, table_1.id, DATETIMETO, DATETIMEFROM));
    expect(res).toBeDefined();
    expect(res.error_msg).not.toBeNull();
    expect(res.status).toBe(400);
  })

  test("should fail due to invalid table id", async () => {
    pdfreporter = new PDFReporter('output.pdf');
    let pdfreporterSpy = jest.spyOn(pdfreporter, 'createDocument').mockImplementation(() => Promise.resolve('done'));

    interactor = new GetReportInteractor(postgres, validator, pdfreporter);

    let res = await interactor.execute(new RequestModel(location_1.id, -100, DATETIMETO, DATETIMEFROM));
    expect(res).toBeDefined();
    expect(res.error_msg).not.toBeNull();
    expect(res.status).toBe(400);
  })

  test("should fail due to invalid location id", async () => {
    pdfreporter = new PDFReporter('output.pdf');
    let pdfreporterSpy = jest.spyOn(pdfreporter, 'createDocument').mockImplementation(() => Promise.resolve('done'));

    interactor = new GetReportInteractor(postgres, validator, pdfreporter);

    let res = await interactor.execute(new RequestModel(-100, table_1.id, DATETIMETO, DATETIMEFROM));
    expect(res).toBeDefined();
    expect(res.error_msg).not.toBeNull();
    expect(res.status).toBe(400);
  })

  test("should fail due to missing To-time", async () => {
    pdfreporter = new PDFReporter('output.pdf');
    let pdfreporterSpy = jest.spyOn(pdfreporter, 'createDocument').mockImplementation(() => Promise.resolve('done'));

    interactor = new GetReportInteractor(postgres, validator, pdfreporter);

    let res = await interactor.execute(new RequestModel(location_1.id, table_1.id, null, DATETIMEFROM));
    expect(res).toBeDefined();
    expect(res.error_msg).not.toBeNull();
    expect(res.status).toBe(400);
  })

  test("should fail due to missing From-time", async () => {
    pdfreporter = new PDFReporter('output.pdf');
    let pdfreporterSpy = jest.spyOn(pdfreporter, 'createDocument').mockImplementation(() => Promise.resolve('done'));

    interactor = new GetReportInteractor(postgres, validator, pdfreporter);

    let res = await interactor.execute(new RequestModel(location_1.id, table_1.id, DATETIMETO, null));
    expect(res).toBeDefined();
    expect(res.error_msg).not.toBeNull();
    expect(res.status).toBe(400);
  })

})

