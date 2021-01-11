#!/bin/bash

echo "----- INTEGRATION TESTS -----"
echo "Wait for DB container has started"
sleep 15
echo "....."

export NODE_ENV=staging
cd ./api
npm run sync
./api/node_modules/.bin/jest ./api/test --notify --config=./api/jest.config.js --runInBand --coverage
