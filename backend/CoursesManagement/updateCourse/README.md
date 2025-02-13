# Update Course Microservice

## Overview

The **Update Course** microservice is responsible for updating course details within the platform. It allows modifications to course attributes such as title, description, and other relevant information.

## Features

- Update course information (title, description, instructor, etc.).
- Validate course existence before applying changes.
- Ensure proper database updates.

## Technology Stack

- **Node.js** (Backend runtime)
- **Express.js** (Web framework)
- **MySQL** (Database)
- **Sequelize** (ORM for database interaction)

## Database Configuration

This microservice connects to a **MySQL database** using Sequelize. The configuration details are found in `db.js` under the `config` directory.

## API Endpoints

**Method**
PUT

**Endpoint**
/courses/update/:courseId

**Description**
Updates a course by ID

## Related Microservices

- **Create Course** (Handles course creation)
- **Delete Course** (Removes courses from the system)
- **List Courses** (Retrieves available courses)

## Data Flow

1. A request is sent to the `/courses/update/:courseId` endpoint with updated course details.
2. The system verifies if the course exists in the database.
3. If the course is found, it updates the corresponding fields.
4. The response returns a success message or an error if any issue occurs.

## Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/JessJoha/PlataformaEducativa.git
   ```
2. Navigate to the microservice directory:
   ```bash
   cd backend/CourseManagement/updateCourse
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
JWT_SECRET=<jwt_secret>
```