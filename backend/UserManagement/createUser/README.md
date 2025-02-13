# Create User Microservice

## Overview
The **Create User** microservice is responsible for handling user registrations within the platform. It processes user data, stores it in the database, and ensures that new users are successfully created.

## Features
- Register new users with essential details (e.g., name, email, password).
- Store user information securely in the database.
- Validate user input to prevent invalid data entries.

## Technology Stack
- **Node.js** (Backend runtime)
- **Express.js** (Web framework)
- **MySQL** (Database)
- **Sequelize** (ORM for database interaction)

## Database Configuration
This microservice connects to a **MySQL database** using Sequelize. The configuration details are found in `db.js` under the `config` directory.

## API Endpoints

**Method**
Post

**Endpoint**
/users/create

**Description**
Creates a new user

## Related Microservices
- **Login** (Handles user authentication)
- **UserManagement** (Manages user operations such as updates and deletions)

## Data Flow
1. A request is sent to the `/users/create` endpoint with user details.
2. The service validates the input and checks for existing users.
3. If the data is valid, a new user record is inserted into the MySQL database.
4. The response returns a success message or an error if any issue occurs.

## Installation & Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/https://github.com/JessJoha/PlataformaEducativa.git
   ```
2. Navigate to the microservice directory:
   ```bash
   cd backend/UserManagement/createUser
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


