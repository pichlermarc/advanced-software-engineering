const PDFDocument = require('pdfkit');
const fs = require('fs');
const Table = require('../../entities/Table');
const Location = require('../../entities/Location');
const Assign = require('../../entities/Assign');

// Table document class
class PDFDocumentWithTables extends PDFDocument {
  constructor (options) {
    super(options);
  }

  table (table, arg0, arg1, arg2) {
    let startX = this.page.margins.left, startY = this.y;
    let options = {};

    if ((typeof arg0 === 'number') && (typeof arg1 === 'number')) {
      startX = arg0;
      startY = arg1;

      if (typeof arg2 === 'object')
        options = arg2;
    } else if (typeof arg0 === 'object') {
      options = arg0;
    }

    const columnCount = table.headers.length;
    const columnSpacing = options.columnSpacing || 15;
    const rowSpacing = options.rowSpacing || 5;
    const usableWidth = options.width || (this.page.width - this.page.margins.left - this.page.margins.right);

    const prepareHeader = options.prepareHeader || (() => {});
    const prepareRow = options.prepareRow || (() => {});
    const computeRowHeight = (row) => {
      let result = 0;

      row.forEach((cell) => {
        const cellHeight = this.heightOfString(cell, {
          width: columnWidth,
          align: 'left'
        });
        result = Math.max(result, cellHeight);
      });

      return result + rowSpacing;
    };

    const columnContainerWidth = usableWidth / columnCount;
    const columnWidth = columnContainerWidth - columnSpacing;
    const maxY = this.page.height - this.page.margins.bottom;

    let rowBottomY = 0;

    this.on('pageAdded', () => {
      startY = this.page.margins.top;
      rowBottomY = 0;
    });

    // Allow the user to override style for headers
    prepareHeader();

    // Check to have enough room for header and first rows
    if (startY + 3 * computeRowHeight(table.headers) > maxY)
      this.addPage();

    // Print all headers
    table.headers.forEach((header, i) => {
      this.text(header, startX + i * columnContainerWidth, startY, {
        width: columnWidth,
        align: 'left'
      });
    });

    // Refresh the y coordinate of the bottom of the headers row
    rowBottomY = Math.max(startY + computeRowHeight(table.headers), rowBottomY);

    // Separation line between headers and rows
    this.moveTo(startX, rowBottomY - rowSpacing * 0.5)
      .lineTo(startX + usableWidth, rowBottomY - rowSpacing * 0.5)
      .lineWidth(2)
      .stroke();

    table.rows.forEach((row, i) => {
      const rowHeight = computeRowHeight(row);

      // Switch to next page if we cannot go any further because the space is over.
      // For safety, consider 3 rows margin instead of just one
      if (startY + 3 * rowHeight < maxY)
        startY = rowBottomY + rowSpacing;
      else
        this.addPage();

      // Allow the user to override style for rows
      prepareRow(row, i);

      // Print all cells of the current row
      row.forEach((cell, i) => {
        this.text(cell, startX + i * columnContainerWidth, startY, {
          width: columnWidth,
          align: 'left'
        });
      });

      // Refresh the y coordinate of the bottom of this row
      rowBottomY = Math.max(startY + rowHeight, rowBottomY);

      // Separation line between rows
      this.moveTo(startX, rowBottomY - rowSpacing * 0.5)
        .lineTo(startX + usableWidth, rowBottomY - rowSpacing * 0.5)
        .lineWidth(1)
        .opacity(0.7)
        .stroke()
        .opacity(1); // Reset opacity after drawing the line
    });

    this.x = startX;
    this.moveDown();

    return this;
  }
}

class PDFReporter {
  constructor(filepath) {
    this.doc = new PDFDocumentWithTables({size: 'A4', pdfVersion: '1.7'});
    this.table0 = {
      headers: ['Location', 'Table', 'Person'],
      rows: []
    };
    this.setupdocument();

    this.savestream = fs.createWriteStream(filepath);
    this.doc.pipe(this.savestream);
  }

  setupdocument() {
    var pageNumber = 1;
    this.doc.on('pageAdded', () => {
      this.doc.text(++pageNumber, 0.5 * (this.doc.page.width - 100), 40, {width: 100, align: 'center'});
    });
    this.doc.image('core/use_cases/report/COVID-19-banner.png', {
      fit: [250, 300],
      align: 'center',
    });
    this.doc.moveDown();
    // draw some headline text
    this.doc.fontSize(25).text('Contact Tracing Report');
    this.doc.fontSize(15).text('Generated: ' + new Date().toUTCString());
    this.doc.moveDown();
    this.doc.font('Times-Roman', 11);
  }

  report(entity) {
    if (entity instanceof Table) {
      this.reportTable(entity);
    } else if (entity instanceof Location) {
      this.reportLocation(entity);
    } else if (entity instanceof Assign) {
      this.reportAssign(entity);
    } else {
      throw new Error('No pdf-reporter for this entity type');
    }
  }

  reportLocation(location) {
    this.table0.rows.push([''+location.id+' '+location.name, '', '']);
  }

  reportTable(table) {
    this.table0.rows.push([''+table.location_id, ''+table.id+' '+table.name, '']);
  }

  reportAssign(assign) {
    this.table0.rows.push(
      [
        ''+assign.location_id,
        ''+assign.table_id,
        ''+assign.first_name+' '+assign.last_name+'\n'+assign.email+'\n'+assign.phone
      ]
    );
  }

  closedocument() {
    this.doc.table(this.table0, {
      prepareHeader: () => this.doc.font('Helvetica-Bold'),
      prepareRow: (row, i) => this.doc.font('Helvetica').fontSize(12)
    });
    this.doc.end();
    return new Promise(resolve => {
      this.savestream.on("finish", () => {
        resolve(fs.readFileSync(this.savestream.path));
      });
    });
  }

  createDocument(entities) {
    for (let i = 0; i < entities.length; i++) {
      entities[i].accept(this);
    }
    return this.closedocument();
  }
}


module.exports = { PDFReporter };
