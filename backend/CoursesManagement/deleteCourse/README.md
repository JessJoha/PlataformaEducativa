# Delete Course Microservice

## Overview

The **Delete Course** microservice is responsible for handling the deletion of courses from the platform. It ensures that only valid courses are removed and maintains referential integrity.

## Features

- Delete a course by its unique identifier.
- Ensure that associated data is properly managed upon deletion.
- Validate user permissions before allowing deletion.

## Technology Stack

- **Node.js** (Backend runtime)
- **Express.js** (Web framework)
- **MySQL** (Database)
- **Sequelize** (ORM for database interaction)

## Database Configuration

This microservice connects to a **MySQL database** using Sequelize. The configuration details are specified in `db.js` under the `config` directory.

## API Endpoints

**Method**
DELETE

**Endpoint**
/courses/delete/:id

**Description**
Deletes a course by ID

## Related Microservices

- **Create Course** (Handles course creation)
- **List Course** (Handles retrieval of course information)
- **Update Course** (Handles updates to course data)

## Data Flow

1. A `DELETE` request is sent to `/courses/delete/:id` with the course ID.
2. The service verifies if the course exists in the database.
3. If found, the course is deleted, and associated relationships are handled.
4. The response returns a success message or an error if the operation fails.

## Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/JessJoha/PlataformaEducativa.git
   ```
2. Navigate to the microservice directory:
   ```bash
   cd backend/CoursesManagement/deleteCourse
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