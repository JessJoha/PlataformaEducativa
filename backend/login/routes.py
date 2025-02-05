from flask import Blueprint, request, jsonify
import jwt
import datetime
from model import db, User
from config import Config

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400

    user = User.query.filter_by(username=username).first()
    if not user or not user.check_password(password):
        return jsonify({'error': 'Invalid credentials'}), 401


    token = jwt.encode({
        'user_id': user.id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    }, Config.JWT_SECRET_KEY, algorithm='HS256')

    return jsonify({'message': 'Login successful', 'token': token})
