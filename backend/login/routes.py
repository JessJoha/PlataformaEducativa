from flask import Blueprint, request, jsonify
import jwt
import datetime
from model import db, User
from config import Config
import requests 

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400


    response = requests.post(f'{Config.CREATE_USER_SERVICE_URL}/login', json={'username': username, 'password': password})

    if response.status_code != 200:
        return jsonify({'error': 'Invalid credentials'}), 401


    user_data = response.json()
    token = jwt.encode({
        'user_id': user_data['user']['id'],
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    }, Config.JWT_SECRET_KEY, algorithm='HS256')

    return jsonify({'message': 'Login successful', 'token': token})