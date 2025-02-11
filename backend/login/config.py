import os
from jwt_config import JWT_SECRET

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') 
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET')
    CREATE_USER_SERVICE_URL = os.environ.get('CREATE_USER_SERVICE_URL', 'http://13.216.132.78:3000/users/register')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DB_URL')  
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    CORS_ALLOWED_ORIGIN = os.environ.get('CORS_ALLOWED_ORIGIN')
    ACCESS_TOKEN_EXPIRATION = int(os.environ.get('ACCESS_TOKEN_EXPIRATION', 3600))
    LOG_LEVEL = os.environ.get('LOG_LEVEL', 'info')
    LOGIN_SERVICE_PORT = int(os.environ.get('LOGIN_SERVICE_PORT', 5000))

