# Update Evaluation Microservice

## Overview

The **Update Evaluation** microservice is responsible for modifying existing evaluation records. It allows instructors or administrators to update evaluation details.

## Features

- Update evaluation details such as title, description, and scoring criteria.
- Validate input data before updating.
- Ensure that only authorized users can modify evaluations.

## Technology Stack

- **Node.js** (Backend runtime)
- **Express.js** (Web framework)
- **PostgreSQL** (Database)
- **Sequelize** (ORM for database interaction)

## Database Configuration

This microservice connects to a **PostgreSQL database** using Sequelize. The configuration details are found in `db.js` under the `config` directory.

## API Endpoints

**Method:** PUT

**Endpoint:** `/evaluations/update/:id`

**Description:** Updates an evaluation based on its ID.

## Related Microservices

- **CreateEvaluation** (An evaluation must exist before it can be updated)

## Data Flow

1. A PUT request is sent to `/evaluations/update/:id` with updated details.
2. The service validates the request and checks if the evaluation exists.
3. If valid, the evaluation record is updated in the PostgreSQL database.
4. The response returns a success message or an error if an issue occurs.

## Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/JessJoha/PlataformaEducativa.git
   ```
2. Navigate to the microservice directory:
   ```bash
   cd backend/EvaluationsManagement/updateEvaluation
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