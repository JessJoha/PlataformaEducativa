# Update User Microservice

## Overview

The **Update User** microservice is responsible for modifying existing user details within the platform. It allows authorized users to update user information stored in the database.

## Features

- Update user details such as name, email, and password.
- Validate input before updating records.
- Ensure data consistency across the system.

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
/users/update/:id

**Description**
Updates user details

## Related Microservices

- **Login** (Handles user authentication)
- **UserManagement** (Manages user operations such as creation and deletion)

## Data Flow

1. A request is sent to the `/users/update/:id` endpoint with user details.
2. The service validates the input and checks if the user exists.
3. If valid, the user record is updated in the MySQL database.
4. The response returns a success message or an error if any issue occurs.

## Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/JessJoha/PlataformaEducativa.git
   ```
2. Navigate to the microservice directory:
   ```bash
   cd backend/UserManagement/updateUser
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