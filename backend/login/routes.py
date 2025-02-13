from flask import Blueprint, request, jsonify
import bcrypt
import jwt
import datetime
from config import Config
from flask_cors import cross_origin
from model import User

auth_bp = Blueprint('auth_bp', __name__)

@auth_bp.route('/login', methods=['POST'])

@cross_origin(origin='*')

def login():
    
    print("Ruta /login accedida")
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400

    
    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404

   
    if not bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
        return jsonify({'error': 'Invalid credentials'}), 401


    token = jwt.encode({
        'user_id': user.id,  
        'role': user.role, 
        'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=Config.ACCESS_TOKEN_EXPIRATION)
    }, Config.JWT_SECRET_KEY, algorithm='HS256')

    return jsonify({'message': 'Login successful', 'token': token}), 200
