from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from routes import auth_bp 
from config import Config
from dotenv import load_dotenv
import pymysql
pymysql.install_as_MySQLdb()

load_dotenv(dotenv_path='../.env')  

app = Flask(__name__)
app.config.from_object(Config)


db = SQLAlchemy(app)


try:

    with app.app_context():
        db.engine.connect()
        print("Conexión exitosa a la base de datos")
except Exception as e:
    print("Error de conexión a la base de datos:", e)


app.register_blueprint(auth_bp, url_prefix='/auth')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
