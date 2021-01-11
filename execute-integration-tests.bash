#!/bin/bash

#set -vx

echo "----- INTEGRATION TESTS -----"
echo "Wait for DB container has started"
sleep 1
echo "....."

export NODE_ENV=staging
cd ./api
npm run sync
bash ./node_modules/.bin/jest ./api/test --notify --config=./jest.config.js --runInBand --coverage

