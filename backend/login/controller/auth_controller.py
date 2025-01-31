from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from config import get_db_connection
from utils.jwt_utils import generate_token

auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/register-admin', methods=['POST'])
def register_admin():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    admin_username = "admin"
    admin_password = generate_password_hash("admin123")
    
    cursor.execute("INSERT INTO users (username, password, role) VALUES (%s, %s, %s)",
                   (admin_username, admin_password, "admin"))
    
    conn.commit()
    conn.close()
    
    return jsonify({"message": "Administrador registrado"}), 201


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
    user = cursor.fetchone()
    conn.close()

    if not user or not check_password_hash(user["password"], password):
        return jsonify({"error": "Credenciales incorrectas"}), 401

    token = generate_token(user["id"], user["role"])
    return jsonify({"token": token, "role": user["role"]}), 200
