import os
from jwt_config import JWT_SECRET_KEY

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') 
    JWT_SECRET_KEY = JWT_SECRET_KEY 
    SQLALCHEMY_DATABASE_URI = f"mysql://{os.environ.get('DB_USER')}:{os.environ.get('DB_PASSWORD')}@{os.environ.get('DB_HOST')}:{os.environ.get('DB_PORT')}/{os.environ.get('DB_NAME')}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    CORS_ALLOWED_ORIGIN = os.environ.get('CORS_ALLOWED_ORIGIN')
    ACCESS_TOKEN_EXPIRATION = int(os.environ.get('ACCESS_TOKEN_EXPIRATION'))
    LOG_LEVEL = os.environ.get('LOG_LEVEL', 'info')


    CREATE_USER_SERVICE_URL = os.environ.get('CREATE_USER_SERVICE_URL', 'http://localhost:3000')