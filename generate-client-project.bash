#! /bin/bash
docker run -it -v $(pwd):/spec/ openapitools/openapi-generator-cli:latest generate -g csharp-netcore -i /spec/openapi.yml -o /spec/RapidGuestRegistration.Client --additional-properties=packageName=RapidGuestRegistration.Client 
sudo chown -R $USER RapidGuestRegistration.Client/
