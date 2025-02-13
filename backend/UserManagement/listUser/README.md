# List User Microservice

## Overview

The **List User** microservice is responsible for retrieving user data from the database and providing it as a response to client requests. It allows fetching a list of all users or retrieving specific user details.

## Features

- Retrieve all registered users.
- Fetch details of a specific user by ID.
- Ensure data integrity and security.

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
GET

**Endpoint**
/users
/users/:id

**Description**
Retrieves all users
Retrieves a user by ID

## Related Microservices

- **Create User** (Handles user registration)
- **Update User** (Manages user modifications)
- **Delete User** (Handles user removals)
- **Login** (Manages user authentication)

## Data Flow

1. A request is sent to the `/users` endpoint to fetch all users or `/users/:id` for a specific user.
2. The service retrieves user information from the MySQL database.
3. The response contains the requested user data or an error message if the user does not exist.

## Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/JessJoha/PlataformaEducativa.git
   ```
2. Navigate to the microservice directory:
   ```bash
   cd backend/UserManagement/listUser
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