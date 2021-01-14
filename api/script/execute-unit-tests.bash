#!/bin/bash


echo "----- UNIT TESTS -----"
echo "Wait for DB container has started"
sleep 12
echo "=> Script continues executing tests..."


export NODE_ENV=staging

# ----- only for local use - START -----
#export NODE_ENV=test
# ----- only for local use - END -----

# NOTE: sync needs the env-var NODE_ENV
npm run sync

jest ./test --config=./jest.config.js --runInBand --coverage --group=-integrationtest


exit 0

