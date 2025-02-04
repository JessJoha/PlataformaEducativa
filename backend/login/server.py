from flask import Flask
from controller.auth_controller import auth_bp
from Config.config import DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT
import pymysql

app = Flask(__name__)


app.register_blueprint(auth_bp, url_prefix="/auth")


def get_db_connection():
    return pymysql.connect(
        host=DB_HOST,
        user=DB_USER,
        password=DB_PASSWORD,
        database=DB_NAME,
        port=DB_PORT,
        cursorclass=pymysql.cursors.DictCursor
    )

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
