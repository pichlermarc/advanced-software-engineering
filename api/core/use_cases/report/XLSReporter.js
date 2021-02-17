var xl = require('excel4node');
const fs = require('fs');
const Table = require('../../entities/Table');
const Location = require('../../entities/Location');
const Assign = require('../../entities/Assign');

// Excel-Reporter
class XLSReporter {
  constructor(filepath) {
    this.filepath = filepath;
    this.wb = new xl.Workbook();
    // Add Worksheets to the workbook
    this.ws = this.wb.addWorksheet('Sheet 1');

    this.normalstyle = this.wb.createStyle({
      font: {
        color: '#000000',
        size: 12,
      },
      alignment: {
        wrapText: true,
        horizontal: 'center'
      }
      // , numberFormat: '$#,##0.00; ($#,##0.00); -',
    });
    let headlinestyle_red = {
      font: {
        color: '#e80a0a',
        size: 15,
        bold: true
      }
    };
    let headlinestyle_black = {
      font: {
        color: '#000000',
        size: 12,
        bold: true
      }
    };
    // draw some headline text
    this.ws.cell(1,1).string('Contact Tracing Report').style(headlinestyle_red);
    this.ws.cell(2,1).string('Generated: ' + new Date().toUTCString()).style(headlinestyle_red);

    // set table columns names
    this.ws.cell(4,1,4,2,true).string('Location').style(headlinestyle_black);
    this.ws.cell(4,3,4,5,true).string('Table').style(headlinestyle_black);
    this.ws.cell(4,6,4,11,true).string('Person').style(headlinestyle_black);
    this.ws.cell(5,1).string('ID').style(headlinestyle_black);
    this.ws.cell(5,2).string('Name').style(headlinestyle_black);
    this.ws.cell(5,3).string('Location ID').style(headlinestyle_black);
    this.ws.cell(5,4).string('Table ID').style(headlinestyle_black);
    this.ws.cell(5,5).string('Name').style(headlinestyle_black);
    this.ws.cell(5,6).string('Location ID').style(headlinestyle_black);
    this.ws.cell(5,7).string('Table ID').style(headlinestyle_black);
    this.ws.cell(5,8).string('First Name').style(headlinestyle_black);
    this.ws.cell(5,9).string('Last Name').style(headlinestyle_black);
    this.ws.cell(5,10).string('Email').style(headlinestyle_black);
    this.ws.cell(5,11).string('Phone').style(headlinestyle_black);

    this.rowToWriteInto = 6; // first 5 rows are used for headline stuff
  }

  report(entity) {
    if (entity instanceof Table)
      this.reportTable(entity);
    else if (entity instanceof Location)
      this.reportLocation(entity);
    else if (entity instanceof Assign)
      this.reportAssign(entity);
    else{
      throw new Error('No xls-reporter for this entity type');
    }
  }

  reportLocation(location) {
    // this.table0.rows.push([''+location.id+' '+location.name, '', '']);

    this.ws.cell(this.rowToWriteInto,1).number(location.id).style(this.normalstyle);
    this.ws.cell(this.rowToWriteInto,2).string(location.name).style(this.normalstyle);

    this.rowToWriteInto += 1;
  }

  reportTable(table) {
    // this.table0.rows.push([''+table.location_id, ''+table.id+' '+table.name, '']);

    this.ws.cell(this.rowToWriteInto,3).number(table.location_id).style(this.normalstyle);
    this.ws.cell(this.rowToWriteInto,4).number(table.id).style(this.normalstyle);
    this.ws.cell(this.rowToWriteInto,5).string(table.name).style(this.normalstyle);

    this.rowToWriteInto += 1;
  }

  reportAssign(assign) {
    // this.table0.rows.push(
    //   [
    //     ''+assign.location_id,
    //     ''+assign.table_id,
    //     ''+assign.first_name+' '+assign.last_name+'\n'+assign.email+'\n'+assign.phone
    //   ]
    // );

    this.ws.cell(this.rowToWriteInto,6).number(assign.location_id).style(this.normalstyle);
    this.ws.cell(this.rowToWriteInto,7).number(assign.table_id).style(this.normalstyle);
    this.ws.cell(this.rowToWriteInto,8).string(assign.first_name).style(this.normalstyle);
    this.ws.cell(this.rowToWriteInto,9).string(assign.last_name).style(this.normalstyle);
    this.ws.cell(this.rowToWriteInto,10).string(assign.email).style(this.normalstyle);
    this.ws.cell(this.rowToWriteInto,11).string(assign.phone).style(this.normalstyle);

    this.rowToWriteInto += 1;
  }

  createDocument(entities) {
    for (let i = 0; i < entities.length; i++) {
      entities[i].accept(this);
    }
    let outputname = this.filepath;
    return new Promise(resolve => {
      this.wb.writeToBuffer()
        .then((buffer) => {
          fs.writeFileSync(outputname, buffer);
          resolve(fs.readFileSync(outputname));
        });
    });
  }
}

module.exports = { XLSReporter };
