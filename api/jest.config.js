"use strict";

module.exports = {
  verbose: false,

  "collectCoverage": true,

  "coverageThreshold": {
    // requested global coverage standards
    "global": {
        "branches": 95,
        "functions": 100,
        "lines": 100,
    },
    // requested 
    "./core/repositories/GuestRegistrationPostgres.js": {
            "branches": 95,
            "functions": 100,
            "lines": 100,
    },
  },

  // output directory for coverage report
  "coverageDirectory": "",
  
  "collectCoverageFrom": [
  ],
};
