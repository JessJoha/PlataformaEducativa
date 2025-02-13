# Login Microservice

## Overview

The **Login** microservice is responsible for handling user authentication. It allows users to log in securely using their credentials and provides authentication tokens for session management.

## Features

- Authenticate users with email and password.
- Generate JWT tokens for secure authentication.
- Verify user credentials before granting access.
- Connects to the **CreateUserService** microservice for user registration.

## Technology Stack

- **Python** (Backend runtime)
- **Flask** (Web framework)
- **MySQL** (Database)
- **SQLAlchemy** (ORM for database interaction)
- **Flask-JWT-Extended** (JWT authentication library)

## Database Configuration

This microservice connects to a **MySQL database** using SQLAlchemy. The configuration details are found in `config.py`.

## API Endpoints

**Method:** POST

**Endpoint:** `/login`

**Description:** Authenticates a user and returns a JWT token.

## Related Microservices

- **CreateUserService** (Handles user registration at `/users/register`)

## Data Flow

1. A POST request is sent to `/login` with user credentials.
2. The service verifies the credentials against the **MySQL database**.
3. If valid, a JWT token is generated and returned.
4. The token is used for authentication in other services.

## Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/JessJoha/PlataformaEducativa.git
   ```
2. Navigate to the microservice directory:
   ```bash
   cd backend/login
   ```
3. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   venv\Scripts\activate
   ```
4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
5. Configure environment variables in a `.env` file.
6. Start the service:
   ```bash
   python app.py
   ```

## Deployment

This microservice is deployed using **Docker** and **GitHub Actions**. The deployment process includes:

- Building the Docker image.
- Pushing the image to DockerHub.
- Running the container on an AWS EC2 instance.

## Environment Variables

Ensure the following environment variables are set:

```
DB_URL=mysql+pymysql://<db_user>:<db_password>@<db_host>:<db_port>/<db_name>
DB_USER=<database_user>
DB_PASSWORD=<database_password>
DB_NAME=<database_name>
JWT_SECRET=<jwt_secret>
CREATE_USER_SERVICE_URL=http://13.216.132.78:3000/users/register
```