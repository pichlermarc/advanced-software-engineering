const sequelize = require('sequelize');
const ResponseModel = require('../responseModels/EntityResponseModel');
const fs = require('fs');

class GetReportInteractor {
  constructor(repository, validator, reporter) {
    this.repository = repository;
    this.validator = validator;
    this.reporter = reporter;
  }

  // 1. call process use-case
  async execute(request_model) { // EntityRequestModel: id, entity(=table)
    // 2. validation
    let validation_result = this.validator.validate(request_model);
    if(!validation_result.isValid) {
      const response_model = new ResponseModel(null,
        validation_result.error_msg,
        400);
      return response_model;
    }

    // 3. DB interaction
    let response_model;

    try {
        if(await this.repository.load_location(request_model.location_id) && await this.repository.load_table(request_model.table_id, request_model.location_id)) {
            let assigns = await this.repository.filter_assign(request_model.location_id, request_model.table_id, request_model.datetimeFrom, request_model.datetimeTo);
            let report = await this.reporter.createDocument(assigns);
            let report_b64 = report.toString('base64');
            response_model = new ResponseModel(report_b64, null, 200);
        }
        else
            response_model = new ResponseModel(null, "Table or location not found", 400);

    } catch (e) {
      response_model = new ResponseModel(null, e.message, 400);
    }

    // 4. return response
    return response_model;
  }
}

module.exports = GetReportInteractor;
