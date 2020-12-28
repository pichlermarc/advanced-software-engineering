## Docker-Compose
Install `docker-compose`. This is not the same as standard/normal `docker`, since normal 
`docker` can only start a single container at a time. `docker-compose` on the other hand 
starts all containers defined in a `docker-compose.yaml` file at the same time. 

`docker-compose up` in the root directory of our project (where the `docker-compose.yaml` file lives) 
starts all containers and logs the output of the processes to std-out.

So far we start 
+ the API backend (localhost:8080/api-docs)
+ the UI frontend (localhost:5000)
+ a postgres DB image 
+ a pgAdmin image to edit the DB (localhost:5050)

The DB uses filesystem volumes to store its data, so the DB data should be persistent. 
These volumes should be in `$project-root/db/postgres` and `$project-root/db/pgadmin`. 
If something does not work out while starting the containers, you can try to delete these 
directories, remove the stopped containers with `docker-compose rm` and run `docker-compose up` again. 

### Regarding DB + pgAdmin
+ pgAdmin (localhost:5050): user/password: `admin@pgadmin.org/admin`
+ postgres DB server: hostname/port/user/password: `postgres/5432/postgres/postgres`
