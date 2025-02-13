# Create Evaluation Microservice

## Overview

The **Create Evaluation** microservice is responsible for handling the creation of evaluations for courses. It allows instructors to define evaluations, set parameters, and register them in the system.

## Features

- Create new evaluations for courses.
- Store evaluation details in the database.
- Validate input data to ensure proper format.

## Technology Stack

- **Node.js** (Backend runtime)
- **Express.js** (Web framework)
- **PostgreSQL** (Database)
- **Sequelize** (ORM for database interaction)

## Database Configuration

This microservice connects to a **PostgreSQL database** using Sequelize. The configuration details are found in `db.js` under the `config` directory.

## API Endpoints

**Method:** POST

**Endpoint:** `/evaluations/create`

**Description:** Creates a new evaluation.

## Related Microservices

(Standalone service that creates evaluations)

## Data Flow

1. A request is sent to `/evaluations/create` with evaluation details.
2. The service validates the input and verifies course existence.
3. If valid, a new evaluation record is inserted into the PostgreSQL database.
4. The response returns a success message or an error if an issue occurs.

## Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/JessJoha/PlataformaEducativa.git
   ```
2. Navigate to the microservice directory:
   ```bash
   cd backend/EvaluationsManagement/createEvaluation
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Configure environment variables in a `.env` file.
5. Start the service:
   ```bash
   npm start
   ```

## Deployment

This microservice is deployed using **Docker** and **GitHub Actions**. The deployment process includes:

- Building the Docker image.
- Pushing the image to DockerHub.
- Running the container on an AWS EC2 instance.

## Environment Variables

Ensure the following environment variables are set:

```
DB_HOST=<database_host>
DB_USER=<database_user>
DB_PASSWORD=<database_password>
DB_NAME=<database_name>
JWT_SECRET=<jwt_secret>
```

