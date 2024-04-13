#!/bin/bash

echo "Waiting for PostgreSQL to start..."

until nc -z "test-db-rafart" "5432"; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

echo "PostgreSQL started. Running migrations..."

yarn migration-show
yarn migration-run

## Run test environment

yarn dev
echo "Test environment ready, go node container shell to run tests"

