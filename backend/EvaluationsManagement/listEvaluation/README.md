# List Evaluation Microservice

## Overview

The **List Evaluation** microservice is responsible for retrieving evaluations from the system. It allows users to fetch evaluation details based on various filters.

## Features

- Retrieve all evaluations.
- Fetch evaluations based on course ID or instructor.
- Ensure secure data access.

## Technology Stack

- **Node.js** (Backend runtime)
- **Express.js** (Web framework)
- **PostgreSQL** (Database)
- **Sequelize** (ORM for database interaction)

## Database Configuration

This microservice connects to a **PostgreSQL database** using Sequelize. The configuration details are found in `db.js` under the `config` directory.

## API Endpoints

**Method:** GET

**Endpoint:** `/evaluations/list`

**Description:** Retrieves all evaluations.

**Method:** GET

**Endpoint:** `/evaluations/list/:courseId`

**Description:** Retrieves evaluations related to a specific course.

## Related Microservices

- **CreateEvaluation ** (Evaluations must exist in the system before they can be listed)

## Data Flow

1. A GET request is sent to `/evaluations/list` or `/evaluations/list/:courseId`.
2. The service fetches relevant data from the PostgreSQL database.
3. The response returns the evaluations or an error if an issue occurs.

## Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/JessJoha/PlataformaEducativa.git
   ```
2. Navigate to the microservice directory:
   ```bash
   cd backend/EvaluationsManagement/listEvaluation
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