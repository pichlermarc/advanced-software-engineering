#!/bin/bash


echo "----- INTEGRATION TESTS -----"
echo "Wait for DB container has started"
#sleep 12
echo "=> Script continues executing tests..."


export NODE_ENV=staging

# ----- only for local use - START -----
#export NODE_ENV=test
# ----- only for local use - END -----

# NOTE: sync needs the env-var NODE_ENV
npm run sync

echo "Run unit-tests first:"
jest ./test --config=./jest.config.js --runInBand --coverage --group=-integrationtest

echo "Run integration-tests next:"
jest ./test --config=./jest.config.js --runInBand --coverage --group=integrationtest

exit 0

