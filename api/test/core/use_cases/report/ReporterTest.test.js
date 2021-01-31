const PDFReporter = require('../../../../core/use_cases/report/PDFReporter').PDFReporter;
// const XLSReporter = require('../../../../core/use_cases/report/XLSReporter').XLSReporter;
const {eLocation, eTable, eAssign} = require("../../../../core/entities")
const fs = require('fs');

const hour_in_seconds = 1 * 60 * 60;
const time_1 = new Date().getTime();
const time_2 = new Date().getTime() - 3 * hour_in_seconds;

let location_1 = new eLocation(1, "Seekaffee");
let location_2 = new eLocation(2, "Hafenstadt");

let table_1 = new eTable(1, "vip", location_1.id);
let table_2 = new eTable(2, "black", location_1.id);

let assign_1 = new eAssign(location_1.id, table_1.id, time_1, "Sepp", "Forcher", "01 234567", "sepp@tv.at");
let assign_2 = new eAssign(location_2.id, table_2.id, time_2, "Richard", "Stallman", "02 234567", "robert@freedom.org");

let entities = [location_1, location_2, table_1, table_2, assign_1, assign_2];

test('generate a simple PDF document for 2 tables, 2 locations, 2 assigns', async () => {
  let filepath = 'output_ReporterTest.pdf';
  let pdfreporter = new PDFReporter(filepath);
  let res = await pdfreporter.createDocument(entities);

  expect(res).toBeDefined();
  let doc = fs.readFileSync(filepath);
  expect(res.toString('base64')).toBe(doc.toString('base64'));
})
