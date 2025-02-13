# Delete User Microservice

## Overview

The **Delete User** microservice is responsible for handling user deletions within the platform. It allows administrators to remove users from the system securely and ensures that associated data is properly handled.

## Features

- Delete users by their unique ID.
- Ensure that only authorized users (e.g., admins) can perform deletions.
- Handle database integrity and prevent orphaned records.

## Technology Stack

- **Node.js** (Backend runtime)
- **Express.js** (Web framework)
- **MySQL** (Database)
- **Sequelize** (ORM for database interaction)

## Database Configuration

This microservice connects to a **MySQL database** using Sequelize. The configuration details are found in `db.js` under the `config` directory.

## API Endpoints

**Method**
DELETE

**Endpoint**
/users/delete/:id

**Description**
Deletes a user by ID

## Related Microservices

- **Create User** (Handles user registration)
- **Login** (Handles user authentication)
- **List User** (Retrieves user details)
- **Update User** (Updates user information)

## Data Flow

1. A request is sent to the `/users/delete/:id` endpoint with a valid user ID.
2. The service verifies if the user exists in the database.
3. If found, the user is deleted from the MySQL database.
4. The response returns a success message or an error if any issue occurs.

## Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/JessJoha/PlataformaEducativa.git
   ```
2. Navigate to the microservice directory:
   ```bash
   cd backend/UserManagement/deleteUser
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