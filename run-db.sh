#!/bin/sh

docker stop $(docker ps -aq)

docker run -d -p 127.0.0.1:5432:5432 -e POSTGRES_PASSWORD=mypassword postgres:16-alpine

echo waiting 10 seconds for DB to be ready...
sleep 10

PGPASSWORD=mypassword psql -h localhost -U postgres -d postgres < create-database.sql

echo database all ready!
