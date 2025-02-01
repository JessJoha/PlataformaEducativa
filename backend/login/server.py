from flask import Flask
from controller.auth_controller import auth_bp

app = Flask(__name__)

app.register_blueprint(auth_bp, url_prefix="/auth")

if __name__ == "__main__":
    app.run(debug=True, port=5000)
