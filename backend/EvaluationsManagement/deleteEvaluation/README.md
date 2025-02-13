# Delete Evaluation Microservice

## Overview

The **Delete Evaluation** microservice is responsible for handling the deletion of evaluations from the system. It allows instructors or administrators to remove evaluations when necessary.

## Features

- Delete evaluations based on evaluation ID.
- Ensure proper validation before deletion.
- Handle cascading effects if an evaluation is linked to other data.

## Technology Stack

- **Node.js** (Backend runtime)
- **Express.js** (Web framework)
- **PostgreSQL** (Database)
- **Sequelize** (ORM for database interaction)

## Database Configuration

This microservice connects to a **PostgreSQL database** using Sequelize. The configuration details are found in `db.js` under the `config` directory.

## API Endpoints

**Method:** DELETE

**Endpoint:** `/evaluations/delete/:id`

**Description:** Deletes an evaluation based on its ID.

## Related Microservices

- **CreateEvaluation** (An evaluation must exist before it can be deleted)

## Data Flow

1. A DELETE request is sent to `/evaluations/delete/:id`.
2. The service checks if the evaluation exists in the database.
3. If the evaluation exists, it is deleted from the PostgreSQL database.
4. The response returns a success message or an error if an issue occurs.

## Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/JessJoha/PlataformaEducativa.git
   ```
2. Navigate to the microservice directory:
   ```bash
   cd backend/EvaluationsManagement/deleteEvaluation
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