from flask import Flask
from config import Config
from dotenv import load_dotenv
import pymysql
from flask_cors import CORS
from extensions import db

load_dotenv()


app = Flask(__name__)


CORS(app, resources={r"/*": {"origins": "*"}})  


app.config.from_object(Config)


pymysql.install_as_MySQLdb()
db.init_app(app)


def create_app():
    from routes import auth_bp
    app.register_blueprint(auth_bp, url_prefix='/auth')
    return app


if __name__ == '__main__':
    create_app()
    app.run(debug=True, host='0.0.0.0', port=Config.LOGIN_SERVICE_PORT)
