# About

Rafart App Backend Service (WIP)

# Description

[Rafart App](https://app.rafartmusic.com) is a showcase of web-based music projects. I am currently extending it to become a central hub for all my (or your) music activities. This will include:

- Music player, downloads, and purchases
- Fan portal with direct communication chat and exclusive content
- Web-based music projects
- Private file sharing for music collaborators
- Patreon-style subscription

# Technologies

- TypeScript
- Node
- Express
- PostgreSQL
- TypeORM
- Redis
- Stripe
- Bcrypt
- Passport
- Nodemailer
- AWS SDK

# How to Run Locally

This app is dockerized. To get up and running:

1. Create a `.env` file and fill in the data.
2. In the root foder install dependencies: `yarn install`
3. Make sure you have Docker Engine installed and run the following in the root directory:
   `docker compose up`

This will set up a Node app for the API, a PostgreSQL DB, and a Redis instance.

# Database migrations

The package.json file includes scripts to generate, show, and run postgres migrations with TypeORM. To run them

1. Bash into your dockerized node API
   `docker exec -ti <container_name> bash`

2. Running migration scripts

- Show migrations `yarn migration-show`
- Generate migration `NAME=YourMigrationName yarn migration-gen`
- Run migrations `yarn migration-run`

The front end app currenty runs with lambdas, this express app will replace that infrastructure.

## Inspect Database

Psql into db
`docker exec -ti <docker-container-name> psql -U admin pg-db-rafart`

# Architecture notes

The app follows an MVC model, with 4 main independent layers:

- Routes: API endpoints
- Use Cases: Business logic
- Gateways: Layer that interacts with the database. All CRUD TypeORM methods go in here.
- Entity: DB Models. No methods here, just PostgreSQL tables.

Other folders:

- Helpers: Helper functions that combine different methods to simplify a task and can have side effects. For example: email sending, get files from S3.
- Utility: Pure functions that do one task, like data mappers, formatters, calculation, date handling, calculations.

# Testing

# Tests

Tests run on a dockerized test environment separate from development.

1. To run the test environment spin up the `docker-compose.test.yaml` containers running:

`docker compose -f docker-compose.test.yml up`

2. Go into the test app container shell
   `docker exec -ti <test_node_app_container_name> bash`

For example: `docker exec -ti rafart-api-test-rafart-1 bash`

3. Run tests inside container
   `yarn test`

## Notes

The docker-compose.test.yml file doesn't have a volume for postgres (commented out). To reset the database completely, just run:
`docker compose -f docker-compose.test.yml down`

### Supertest notes

- Supertest route tests don't need the docker environment set up, as supertest establishes the database connections and app independently.
- Supertest is like a client based http request tool (ex: axios) but for api testing.
