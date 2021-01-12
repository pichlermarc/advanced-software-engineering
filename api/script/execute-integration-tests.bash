#!/bin/bash


echo "----- INTEGRATION TESTS -----"
echo "Wait for DB container has started"
sleep 12
echo "=> Script continues executing tests..."

export NODE_ENV=staging
#export NODE_ENV=test
# NOTE: sync needs the env-var NODE_ENV
npm run sync
jest ./test --config=./jest.config.js --runInBand --coverage

