from flask import Flask
from config import Config
from dotenv import load_dotenv
import pymysql
from flask_cors import CORS
from extensions import db

load_dotenv()

app = Flask(__name__)


cors = CORS(app, resources={
    r"/*": {
        "origins": "http://localhost:8000",
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
        "supports_credentials": True
    }
})

app.config.from_object(Config)

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:8000')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response

pymysql.install_as_MySQLdb()
db.init_app(app)


def create_app():
    from routes import auth_bp  
    app.register_blueprint(auth_bp, url_prefix='/auth')
    return app

if __name__ == '__main__':
    create_app() 
    app.run(debug=True, host='0.0.0.0', port=Config.LOGIN_SERVICE_PORT)
