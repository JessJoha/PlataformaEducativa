from flask import Blueprint, request, jsonify
from werkzeug.security import check_password_hash
from Config.config import get_db_connection  
from utils.jwt_utils import generate_token  

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
    user = cursor.fetchone()

    if not user or not check_password_hash(user["password"], password):
        return jsonify({"error": "Credenciales incorrectas"}), 401

 
    token = generate_token(user["id"], user["role"])
    return jsonify({"token": token, "role": user["role"]}), 200