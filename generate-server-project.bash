#! /bin/bash
docker run -it -v $(pwd):/spec/ openapitools/openapi-generator-cli:latest generate -g nodejs-express-server -i /spec/openapi.yml -o /spec/api
sudo chown -R $USER api/