# Create Course Microservice

## Overview

The **Create Course** microservice is responsible for handling the creation of courses within the platform. It processes course data, stores it in the database, and ensures that new courses are successfully registered.

## Features

- Register new courses with essential details (e.g., title, description, instructor, category).
- Store course information securely in the database.
- Validate input data to prevent invalid entries.

## Technology Stack

- **Node.js** (Backend runtime)
- **Express.js** (Web framework)
- **MySQL** (Database)
- **Sequelize** (ORM for database interaction)

## Database Configuration

This microservice connects to a **PostgreSQL database** using Sequelize. The configuration details are found in `db.js` under the `config` directory.

## API Endpoints

**Method**
POST

**Endpoint**
/courses/create

**Description**
Creates a new course

## Related Microservices

- **UserManagement** (Handles user roles, including instructors and students)
- **EvaluationManagement** (Courses may include evaluations)

## Data Flow

1. A request is sent to the `/courses/create` endpoint with course details.
2. The service validates the input and checks for existing courses.
3. If the data is valid, a new course record is inserted into the PostgreSQL database.
4. The response returns a success message or an error if any issue occurs.

## Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/JessJoha/PlataformaEducativa.git
   ```
2. Navigate to the microservice directory:
   ```bash
   cd backend/CourseManagement/createCourse
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