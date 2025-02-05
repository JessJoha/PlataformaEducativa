import os


jwt_secret = os.urandom(24).hex()

print(f"JWT_SECRET={jwt_secret}")