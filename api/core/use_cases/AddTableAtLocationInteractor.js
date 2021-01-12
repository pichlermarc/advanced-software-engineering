"use strict";

const TableEntity = require('../entities/Table');
const ResponseModel = require('../responseModels/EntityResponseModel');

class AddTableAtLocationInteractor {
    constructor(repository, idvalidator, tablevalidator) {
        this.repository = repository;
        this.idvalidator = idvalidator;
        this.tablevalidator = tablevalidator;
    }

    // 1. call process use-case
    execute(request_model) { // EntityRequestModel: id, entity(=table)
        // 2. validation
        let validation_result_id = this.idvalidator.validate(request_model);
        let validation_result_table = this.tablevalidator.validate(request_model.entity);
        if(!validation_result_id.isValid) {
            const response_model = new ResponseModel(request_model.entity,
              validation_result_id.error_msg);
            return response_model;
        } else if (!validation_result_table.isValid) {
            const response_model = new ResponseModel(request_model.entity,
              validation_result_table.error_msg);
            return response_model;
        }

        // 3. DB interaction
        const table = request_model.entity;
        let response_model;
        if(this.repository.load_location(request_model.id)) { // location was found in db
            let dbtables = this.repository.load_all_tables(table.location_id);
            dbtables = dbtables.filter(t => t.location_id === request_model.id); // all tables of the location
            dbtables = dbtables.filter(t => t.id === table.id)
            if (dbtables.length === 0) {// location does not already have a table with the same table-id
                if (table.location_id === request_model.id) {
                    this.repository.save_table(table);
                    response_model = new ResponseModel(table);
                }
                else {
                    response_model = new ResponseModel(table,
                      `Can not add table from location (id=)${table.location_id} to location (id=)${request_model.id}!`);
                    }
            } else {
                response_model = new ResponseModel(table,
                  `Table with id=${table.id} already exists in location (id=)${request_model.id}!`);
                }
        } else {
            response_model = new ResponseModel(table,
              `Location with id=${request_model.id} does not exist yet!`);
          }

        // 4. return response
        return response_model;
    }
}

module.exports = AddTableAtLocationInteractor;
