#!/bin/bash

#set -vx


echo "----- INTEGRATION TESTS -----"
echo "Wait for DB container has started"
sleep 10
echo "....."

export NODE_ENV=staging
npm run sync
jest ./test --notify --config=./jest.config.js --runInBand --coverage

