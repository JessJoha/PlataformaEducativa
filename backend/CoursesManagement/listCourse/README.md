# List Course Microservice

## Overview

The **List Course** microservice is responsible for retrieving a list of available courses stored in the system. It fetches course details from the database and provides them via an API endpoint.

## Features

- Retrieve all available courses.
- Fetch details of each course including name, description, and instructor.
- Provides a structured JSON response.

## Technology Stack

- **Node.js** (Backend runtime)
- **Express.js** (Web framework)
- **MySQL** (Database)
- **Sequelize** (ORM for database interaction)

## Database Configuration

This microservice connects to a **MySQL database** using Sequelize. The configuration details are found in `db.js` under the `config` directory.

## API Endpoints

**Method**
GET

**Endpoint**
/courses/list

**Description**
Fetches all courses

## Related Microservices

- **Create Course** (Handles adding new courses)
- **Update Course** (Updates course details)
- **Delete Course** (Removes a course from the system)

## Data Flow

1. A request is sent to the `/courses/list` endpoint.
2. The service queries the MySQL database for all available courses.
3. The response contains a structured list of courses in JSON format.
4. If no courses exist, an appropriate error message is returned.

## Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/JessJoha/PlataformaEducativa.git
   ```
2. Navigate to the microservice directory:
   ```bash
   cd backend/CoursesManagement/listCourse
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
- Pulling and running the container on an AWS EC2 instance.

## Environment Variables

Ensure the following environment variables are set:

```
DB_HOST=<database_host>
DB_USER=<database_user>
DB_PASSWORD=<database_password>
DB_NAME=<database_name>
DB_PORT=<database_port>
```